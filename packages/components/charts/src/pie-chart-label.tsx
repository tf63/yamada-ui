import { ui } from "@yamada-ui/core"
import { cx, isUndefined } from "@yamada-ui/utils"

const RADIAN = Math.PI / 180
const DEFAULT_LABEL_OFFSET = 22

export type PieChartLabelProps = {
  className?: string
  cx?: number
  cy?: number
  midAngle?: number
  innerRadius?: number
  outerRadius?: number
  middleRadius?: number
  percent?: number
  value?: number
  labelOffset?: number
  isParcent?: boolean
  labelProps?: HTMLUIProps<"text">
  valueFormatter?: (value: number) => string
  styles: Dict<CSSUIObject>
}

export const pieChartLabel: (props: PieChartLabelProps) => React.ReactNode = ({
  className: cellClassName,
  cx: cxProp = 0,
  cy: cyProp = 0,
  midAngle,
  innerRadius,
  outerRadius,
  middleRadius,
  percent,
  value,
  labelOffset: labelOffsetProp,
  isParcent,
  labelProps,
  valueFormatter,
  styles,
}) => {
  const labelOffset =
    labelOffsetProp ?? (outerRadius - innerRadius) * 0.5 + DEFAULT_LABEL_OFFSET

  const x = cxProp + (middleRadius + labelOffset) * Math.cos(-midAngle * RADIAN)
  const y = cyProp + (middleRadius + labelOffset) * Math.sin(-midAngle * RADIAN)

  const textAnchor = x > cxProp ? "start" : x < cxProp ? "end" : "middle"
  const displayLabel = () => {
    if (isParcent) {
      return (
        parseFloat((percent * 100).toFixed(0)) > 0 &&
        `${(percent * 100).toFixed(0)}%`
      )
    } else if (!isUndefined(valueFormatter)) {
      return valueFormatter(value)
    } else {
      return value
    }
  }

  return (
    <ui.text
      className={cx(cellClassName, "ui-pie-chart__label")}
      x={x}
      y={y}
      textAnchor={textAnchor}
      dominantBaseline="central"
      __css={styles}
      {...labelProps}
    >
      {displayLabel()}
    </ui.text>
  )
}

export type PieChartLabelLineProps = {
  className?: string
  cx?: number
  cy?: number
  innerRadius?: number
  midAngle?: number
  middleRadius?: number
  outerRadius?: number
  points?: Array<{ x: number; y: number }>
  stroke?: string
  strokeWidth?: number
}

export const pieChartLabelLine: (
  props: PieChartLabelLineProps,
) => React.ReactElement<SVGElement> = ({}) => {
  return <ui.path />
}
