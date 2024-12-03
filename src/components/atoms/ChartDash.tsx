
import Chart from "react-google-charts"

interface IChartDashProps {
    data: object
    options: object

}
export const ChartDash = ({ data, options }: IChartDashProps) => {

    return (

        <Chart
            width={'400px'}
            height={'300px'}
            chartType="PieChart"
            data={data}
            legendToggle
            options={options}
        />
    )
}