import format from "date-fns/format"
import startOfISOWeek from "date-fns/startOfISOWeek"
import endOfISOWeek from "date-fns/endOfISOWeek"
import endOfMonth from "date-fns/endOfMonth"

import { Currency } from "types/typings"

export type ChartMode = "week" | "month" | "year"

export const customParamsForChart = (mode: ChartMode, currency: Currency) => {
	if (mode === "week") {
		return {
			aggregate_by: "day",
			fromdate: startOfISOWeek(new Date()).toISOString().split("T")[0],
			todate: endOfISOWeek(new Date()).toISOString().split("T")[0],
			xformat: "day",
			tformat: "d",
			fromDate: startOfISOWeek(new Date()).toISOString(),
			toDate: endOfISOWeek(new Date()).toISOString(),
			code: currency?.code
		}
	} else if (mode === "month") {
		return {
			aggregate_by: "day",
			fromdate: format(new Date(), "yyyy-MM-01"),
			todate: endOfMonth(new Date()).toISOString().split("T")[0],
			xformat: "dd",
			tformat: "d",
			fromDate: format(new Date(), "yyyy-MM-01"),
			toDate: endOfMonth(new Date()).toISOString(),
			code: currency?.code
		}
	} else if (mode === "year") {
		return {
			aggregate_by: "month",
			fromdate: format(new Date(), "yyyy-01-01"),
			todate: format(new Date(), "yyyy-12-31"),
			xformat: "month",
			tformat: "d",
			fromDate: format(new Date(), "yyyy-01-01"),
			toDate: format(new Date(), "yyyy-12-31"),
			code: currency?.code
		}
	}
}
