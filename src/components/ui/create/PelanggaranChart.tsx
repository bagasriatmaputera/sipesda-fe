import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const chartConfig = {
    total: {
        label: "Total Pelanggaran",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export function PelanggaranChart({ data = [] }: { data: any[] }) {
    return (
        <Card className="shadow-sm border-zinc-200">
            <CardHeader>
                <CardTitle className="text-lg font-bold">Tren Pelanggaran Siswa</CardTitle>
                <CardDescription>Data statistik per bulan pada tahun {new Date().getFullYear()}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.5} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            tickFormatter={(value) => value.slice(0, 3)} 
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Bar
                            dataKey="total"
                            fill="var(--color-total)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}