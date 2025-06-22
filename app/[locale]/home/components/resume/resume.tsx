"use client";

import React from "react";
import styles from "./resume.module.scss";
import { useMediaQuery } from "@/app/utils/util";
import clsx from "clsx";
import { useTranslations } from "next-intl";

/**
 * The available companies for the résumé
 */
const companies: Record<
    string,
    {
        icon: string;
        color: string;
    }
> = {
    zwick: { icon: "zwick-roell", color: "#d9232a" },
    thu: { icon: "thu", color: "#007ac1" },
    einstein: { icon: "einstein", color: "#f2c04e" },
    weichwaren: { icon: "weichwarenprojekt", color: "#f27d42" },
    vollkit: { icon: "vollkit", color: "#99cc33" },
    freelance: { icon: "freelancing", color: "#03c712" },
    hobby: { icon: "git", color: "#03c712" },
};

/**
 * The commit history (changes in the cv)
 */
const commits = [
    {
        year: 2017,
        companyKey: "hobby",
        branch: "main",
        message: "hobby2017",
    },
    {
        year: 2018,
        companyKey: "thu",
        branch: "hochschule",
        parentBranch: "main",
        message: "thu2018",
    },
    {
        year: 2018,
        companyKey: "zwick",
        branch: "studium",
        parentBranch: "main",
        message: "zwick2018",
    },
    {
        year: 2020,
        companyKey: "einstein",
        branch: "driverless",
        parentBranch: "hochschule",
        message: "einstein2020",
    },
    {
        year: 2022,
        companyKey: "einstein",
        branch: "driverless",
        message: "einstein2022",
        mergeInto: "hochschule",
    },
    {
        year: 2022,
        companyKey: "thu",
        branch: "hochschule",
        message: "thu2022",
        mergeInto: "main",
    },
    {
        year: 2022,
        companyKey: "zwick",
        branch: "studium",
        message: "zwick2022",
    },
    {
        year: 2022,
        companyKey: "weichwaren",
        branch: "weichwarenprojekt",
        parentBranch: "main",
        message: "weichwaren2022",
    },
    {
        year: 2023,
        companyKey: "vollkit",
        branch: "vollkit",
        parentBranch: "weichwarenprojekt",
        message: "vollkit2023",
    },
    {
        year: 2023,
        companyKey: "zwick",
        branch: "studium",
        message: "zwick2023",
        mergeInto: "main",
    },
    {
        year: 2023,
        companyKey: "weichwaren",
        branch: "weichwarenprojekt",
        message: "weichwaren2023",
    },
    {
        year: 2025,
        companyKey: "vollkit",
        branch: "vollkit",
        message: "vollkit2025",
        mergeInto: "weichwarenprojekt",
    },
    {
        year: 2025,
        companyKey: "weichwaren",
        branch: "weichwarenprojekt",
        message: "weichwaren2025",
        mergeInto: "main",
    },
    {
        year: 2025,
        companyKey: "freelance",
        branch: "freelance",
        parentBranch: "main",
        message: "freelance2025",
    },
];

/**
 * A component that renders a Git-like history graph for a resume or timeline.
 */
export const Resume: React.FC = () => {
    const isMobile = useMediaQuery("(max-width: 800px)");
    const isVerySmall = useMediaQuery("(max-width: 350px)");
    const t = useTranslations("pages.home.resume");

    // --- GRAPH LAYOUT CALCULATION ---
    const branchLanes = new Map<string, number>();
    const branchLifespans = new Map<string, { start: number; end: number }>();
    const mergedBranches = new Set<string>();

    // 1. Determine the start and end index for each branch's life
    commits.forEach((commit, index) => {
        if (!branchLifespans.has(commit.branch)) {
            branchLifespans.set(commit.branch, { start: index, end: index });
        }
        branchLifespans.get(commit.branch)!.end = index;

        if (commit.mergeInto) {
            mergedBranches.add(commit.branch);
        }
    });

    // 2. Extend the lifespan of any branch that is never merged to the end
    branchLifespans.forEach((lifespan, branchName) => {
        if (!mergedBranches.has(branchName)) {
            lifespan.end = commits.length - 1;
        }
    });

    // 3. Allocate lanes based on concurrent branch lifespans
    commits.forEach((commit, index) => {
        if (branchLanes.has(commit.branch)) return;

        const activeBranches = Array.from(branchLifespans.entries())
            .filter(([, lifespan]) => index >= lifespan.start && index <= lifespan.end)
            .map(([branchName]) => branchName);

        const occupiedLanes = new Set(activeBranches.map((b) => branchLanes.get(b)).filter((l) => l !== undefined));

        let newLane = 0;
        while (occupiedLanes.has(newLane)) {
            newLane++;
        }
        branchLanes.set(commit.branch, newLane);
    });

    const ROW_HEIGHT = isMobile ? 120 : 80;
    const LANE_WIDTH = isVerySmall ? 20 : isMobile ? 25 : 50;
    const PADDING_TOP = ROW_HEIGHT / 2;

    const maxLane = Math.max(0, ...Array.from(branchLanes.values()));
    const svgHeight = (commits.length - 1) * ROW_HEIGHT + PADDING_TOP + ROW_HEIGHT / 2;
    const svgWidth = (maxLane + 1) * LANE_WIDTH;
    const spacing = isVerySmall ? 0.5 : 1;
    const commitDetailsMargin = (maxLane + spacing) * LANE_WIDTH;

    return (
        <div className={styles.graphContainer}>
            <svg width={svgWidth} height={svgHeight} className={styles.graphSvg}>
                {/* Render all the vertical and branching lines */}
                {Array.from(branchLanes.keys()).map((branchName) => {
                    const lifespan = branchLifespans.get(branchName)!;
                    const lane = branchLanes.get(branchName)!;
                    const firstCommit = commits[lifespan.start];
                    const color = companies[firstCommit.companyKey].color;

                    const lineY1 = lifespan.start * ROW_HEIGHT + PADDING_TOP;
                    const lineY2 = lifespan.end * ROW_HEIGHT + PADDING_TOP;

                    return (
                        <g key={`line-${branchName}`}>
                            <line
                                x1={lane * LANE_WIDTH}
                                y1={lineY1}
                                x2={lane * LANE_WIDTH}
                                y2={lineY2}
                                stroke={color}
                                strokeWidth="2"
                            />
                            {/* Draw fork line */}
                            {firstCommit.parentBranch && branchLanes.has(firstCommit.parentBranch) && (
                                <line
                                    x1={branchLanes.get(firstCommit.parentBranch)! * LANE_WIDTH}
                                    y1={lineY1}
                                    x2={lane * LANE_WIDTH}
                                    y2={lineY1}
                                    stroke={color}
                                    strokeWidth="2"
                                />
                            )}
                        </g>
                    );
                })}
                {/* Render merge lines */}
                {commits.map((commit, index) => {
                    if (!commit.mergeInto) return null;
                    const fromLane = branchLanes.get(commit.branch)!;
                    const toLane = branchLanes.get(commit.mergeInto)!;
                    const y = index * ROW_HEIGHT + PADDING_TOP;
                    const color = companies[commit.companyKey].color;
                    return (
                        <line
                            key={`merge-${index}`}
                            x1={fromLane * LANE_WIDTH}
                            y1={y}
                            x2={toLane * LANE_WIDTH}
                            y2={y}
                            stroke={color}
                            strokeWidth="2"
                        />
                    );
                })}
            </svg>

            <div className={styles.commitList}>
                {commits.map((commit, index) => {
                    const company = companies[commit.companyKey];
                    const lane = branchLanes.get(commit.branch);
                    if (lane === undefined) return null;

                    return (
                        <div key={index} className={styles.commitRow} style={{ height: `${ROW_HEIGHT}px` }}>
                            <div className={styles.commitNodeContainer} style={{ left: `${lane * LANE_WIDTH}px` }}>
                                <div
                                    className={clsx("icon-box", styles.commitIcon)}
                                    style={{ background: company.color, boxShadow: `0 0 12px ${company.color}` }}
                                >
                                    <div className={"custom-border"} style={{ borderColor: company.color }}></div>
                                    <span className={clsx("icon-32", `icon-${company.icon}`)} />
                                </div>
                            </div>

                            <div className={styles.commitDetails} style={{ marginLeft: `${commitDetailsMargin}px` }}>
                                <span className={styles.commitYear}>{commit.year}</span>
                                <p className={clsx(styles.commitMessage, "white-font")}>
                                    {t(`commits.${commit.message}`)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
