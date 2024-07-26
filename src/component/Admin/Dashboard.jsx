import Layout from "./Layout";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const sales = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
  };

  const profit = {
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  };

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-0 bg-slate-100">
        <div className="w-11/12 border bg-orange-600 rounded-md">
          <div className=" px-6 py-10  flex items-center justify-between gap-5  ">
            <div className=" pr-10 border-r-2  border-slate-200">
              <button className=" mx-auto h-12 w-12 rounded-full bg-orange-400 border-white">
                <i className="ri-shopping-cart-line text-2xl text-white"></i>
              </button>
              <h1 className="font-bold text-white">Products</h1>
            </div>
            <p className="text-right font-extrabold text-white text-2xl ">
              22,515
            </p>
          </div>
        </div>
        <div className="w-11/12 border bg-indigo-600 rounded-md">
          <div className=" px-6 py-10  flex items-center justify-between gap-5  ">
            <div className=" pr-10 border-r-2  border-slate-200">
              <button className=" mx-auto h-12 w-12 rounded-full bg-orange-400 border-white">
                <i className="ri-shopping-cart-line text-2xl text-white"></i>
              </button>
              <h1 className="font-bold text-white">Products</h1>
            </div>
            <p className="text-right font-extrabold text-white text-2xl ">
              22,515
            </p>
          </div>
        </div>
        <div className="w-11/12 border bg-lime-500 rounded-md">
          <div className=" px-6 py-10  flex items-center justify-between gap-5  ">
            <div className=" pr-10 border-r-2  border-slate-200">
              <button className=" mx-auto h-12 w-12 rounded-full bg-orange-400 border-white">
                <i className="ri-shopping-cart-line text-2xl text-white"></i>
              </button>
              <h1 className="font-bold text-white">Products</h1>
            </div>
            <p className="text-right font-extrabold text-white text-2xl ">
              22,515
            </p>
          </div>
        </div>
        <div className="w-11/12 border bg-rose-600 rounded-md">
          <div className=" px-6 py-10  flex items-center justify-between gap-5  ">
            <div className=" pr-10 border-r-2  border-slate-200">
              <button className=" mx-auto h-12 w-12 rounded-full bg-orange-400 border-white">
                <i className="ri-shopping-cart-line text-2xl text-white"></i>
              </button>
              <h1 className="font-bold text-white">Products</h1>
            </div>
            <p className="text-right font-extrabold text-white text-2xl ">
              22,515
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 md:col-span-2">
        <h1 className="text-xl font-semibold">Sales</h1>
        <Chart
          options={sales.options}
          series={sales.series}
          width={"100%"}
          height={250}
        />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 md:col-span-2">
        <h1 className="text-xl font-semibold">Profit</h1>
        <Chart
          options={profit.options}
          series={profit.series}
          height={250}
          width={"100%"}
          type="bar"
        />
      </div>

      <div className="p-8 bg-purple-500 rounded-lg shadow-lg md:col-span-4 flex md:flex-row flex-col items-center gap-8">
        <div className="bg-white rounded-full flex items-center">
          <img src="/images/.webp" className="w-[180px]" />
        </div>
        <div>
          <h1 className="md:text-4xl md:text-left text-2xl font-bold text-white mb-2 text-center">
            Dashboard Report & Analytics
          </h1>
          <p className="text-gray-50 md:text-left text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            quod excepturi ratione ipsam. Recusandae deleniti ab aliquid nam,
            fugiat perferendis? Quia impedit dolorem hic dolores et tempore
            corrupti vero eaque.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
