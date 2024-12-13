// app/routes/_index.tsx
import type { MetaFunction } from "@remix-run/node";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  marketCap,
  holdings,
  recentTrades,
  marketCapHistory,
  portfolioPerformance,
  experimentsInProgress,
  experimentTokens,
} from "~/utils/mockData";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSign,
  // TrendingUp,
  Briefcase,
  Beaker,
  Link,
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  // Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "DAO Fund Dashboard" },
    {
      name: "description",
      content:
        "Empowering decentralized innovation through collaborative fund management",
    },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen text-white">
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          DAO Fund Dashboard
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Empowering decentralized innovation through collaborative fund
          management
        </p>

        <div className="grid gap-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <MarketCap value={marketCap} />
            <PortfolioValue
              value={holdings.reduce((sum, holding) => sum + holding.value, 0)}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <MarketCapChart data={marketCapHistory} />
            <PortfolioPerformanceChart data={portfolioPerformance} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <ExperimentsInProgress experiments={experimentsInProgress} />
          <ExperimentTokens tokens={experimentTokens} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <HoldingsTable holdings={holdings} />
          <RecentTradesTable trades={recentTrades} />
        </div>
      </div>
    </div>
  );
}

// Types
interface Experiment {
  name: string;
  description: string;
  progress: number;
}

interface Token {
  name: string;
  symbol: string;
  link: string;
}

interface Holding {
  asset: string;
  amount: number;
  value: number;
}

interface Trade {
  date: string;
  action: string;
  asset: string;
  amount: number;
  price: number;
}

function MarketCap({ value }: { value: number }) {
  return (
    <Card className="bg-[#13151a] border-[#2a2d35] shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">
          Market Cap
        </CardTitle>
        <DollarSign className="h-4 w-4 text-green-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-400">
          {value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function PortfolioValue({ value }: { value: number }) {
  return (
    <Card className="bg-[#13151a] border-[#2a2d35] shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">
          Portfolio Value
        </CardTitle>
        <Briefcase className="h-4 w-4 text-blue-400" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-400">
            {value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <Button
            size="sm"
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Buy More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MarketCapChart({
  data,
}: {
  data: Array<{ date: string; value: number }>;
}) {
  return (
    <Card className="bg-[#13151a] border-[#2a2d35] shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-gray-400">Market Cap History</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Market Cap",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1e9}B`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4ade80"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function PortfolioPerformanceChart({
  data,
}: {
  data: Array<{ date: string; value: number }>;
}) {
  return (
    <Card className="bg-[#13151a] border-[#2a2d35] shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-gray-400">Portfolio Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Portfolio Value",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1e6}M`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function ExperimentsInProgress({ experiments }: { experiments: Experiment[] }) {
  return (
    <Card className="bg-[#13151a] border-[#2a2d35] shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-gray-400">Experiments In Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {experiments.map((experiment, index) => (
            <li key={index} className="flex items-center">
              <Beaker className="h-4 w-4 text-purple-400 mr-2" />
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-200">
                  {experiment.name}
                </p>
                <p className="text-xs text-gray-400">
                  {experiment.description}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: `${experiment.progress}%` }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function ExperimentTokens({ tokens }: { tokens: Token[] }) {
  return (
    <Card className="bg-[#13151a] border-[#2a2d35] shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-gray-400">Experiment Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Symbol</TableHead>
              <TableHead className="text-gray-400">Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map((token, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-gray-300">
                  {token.name}
                </TableCell>
                <TableCell className="text-gray-300">{token.symbol}</TableCell>
                <TableCell className="text-gray-300">
                  <a
                    href={token.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    <Link className="h-4 w-4 inline-block" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function HoldingsTable({ holdings }: { holdings: Holding[] }) {
  return (
    <Card className="bg-[#13151a] border-[#2a2d35] shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-gray-400">Current Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-400">Asset</TableHead>
              <TableHead className="text-gray-400">Amount</TableHead>
              <TableHead className="text-gray-400">Value (USD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holdings.map((holding, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-gray-300">
                  {holding.asset}
                </TableCell>
                <TableCell className="text-gray-300">
                  {holding.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-gray-300">
                  {holding.value.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function RecentTradesTable({ trades }: { trades: Trade[] }) {
  return (
    <Card className="bg-[#13151a] border-[#2a2d35] shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-gray-400">Recent Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Action</TableHead>
              <TableHead className="text-gray-400">Asset</TableHead>
              <TableHead className="text-gray-400">Amount</TableHead>
              <TableHead className="text-gray-400">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade, index) => (
              <TableRow key={index}>
                <TableCell className="text-gray-300">{trade.date}</TableCell>
                <TableCell>
                  {trade.action === "BUY" ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-400 inline mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-400 inline mr-1" />
                  )}
                  <span
                    className={
                      trade.action === "BUY" ? "text-green-400" : "text-red-400"
                    }
                  >
                    {trade.action}
                  </span>
                </TableCell>
                <TableCell className="text-gray-300">{trade.asset}</TableCell>
                <TableCell className="text-gray-300">{trade.amount}</TableCell>
                <TableCell className="text-gray-300">
                  ${trade.price.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
