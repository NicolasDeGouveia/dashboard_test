import React, { useRef, useEffect } from 'react';
import { init, getInstanceByDom } from 'echarts';
import type { CSSProperties } from 'react';
import type { EChartsOption, ECharts, SetOptionOpts } from 'echarts';

export interface ReactEChartsProps {
    option: EChartsOption;
    style?: CSSProperties;
    settings?: SetOptionOpts;
}

export function ReactECharts({ option, style, settings }: ReactEChartsProps): JSX.Element {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize chart
        let chart: ECharts | undefined;
        if (chartRef.current !== null) {
            chart = init(chartRef.current);
        }

        // Handle responsive chart
        function resizeChart() {
            chart?.resize();
        }
        window.addEventListener('resize', resizeChart);

        return () => {
            chart?.dispose();
            window.removeEventListener('resize', resizeChart);
        };
    }, []);

    // Update the chart whenever options or settings change
    useEffect(() => {
        if (chartRef.current !== null) {
            const chart = getInstanceByDom(chartRef.current);
            chart?.setOption(option, settings);
        }
    }, [option, settings]);

    return (
        <div
            ref={chartRef}
            style={{ width: '100%', height: '100px', ...style }}
        />
    );
}
