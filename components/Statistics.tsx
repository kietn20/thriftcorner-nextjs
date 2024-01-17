import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const data = [
	{
		price: 4000,
	},
	{
		price: 3000,
	},
	{
		price: 2000,
	},
	{
		price: 2780,
	},
	{
		price: 1890,
	},
	{
		price: 2390,
	},
	{
		price: 3490,
	},
];

const Statistics = ({products}: any) => {
	return (
		<div className="w-full h-[600px]">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					width={500}
					height={300}
					data={products}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" label={{value: 'Products', position: 'insideBottomRight', offset: 0 }} />
					<YAxis label={{ value: 'Price USD', angle: -90, position: 'insideLeft' }}/>
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="price" stroke="#82ca9d" />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Statistics;
