import React, { useCallback, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import ApexCharts, { ApexOptions } from "apexcharts";
import SignalRService from '../../utils/signalrEndpoint';
import StopButton from '../bin/stopButton';
import ExtendedPacket from "../../interfaces/extendedPacketInterface";
import { noSSR } from 'next/dynamic';
import { Box } from "@mui/material";

const DynamicReviewChart = dynamic(() => import('react-apexcharts'), { 
  loader: () => import('react-apexcharts'),
  ssr: false 
});

interface ReviewChartProps {
  label?: string;
  expectedMinValue: number;
  expectedMaxValue: number;
  expectedMinValueTwo?: number;
  expectedMaxValueTwo?: number;
  seriesOneLapOne: number[];
  seriesTwoLapOne?: number[];
  seriesOneLapTwo: number[];
  seriesTwoLapTwo?: number[];
  height?:number
  numberOfStreams:number;
  curves:string[];
  leftLabel:string;
  rightLabel:string;
}

export default function ReviewChart({ label, expectedMaxValue, expectedMinValue, height, expectedMaxValueTwo, expectedMinValueTwo, seriesOneLapOne, seriesTwoLapOne,seriesOneLapTwo, seriesTwoLapTwo, numberOfStreams,curves, leftLabel,rightLabel }: ReviewChartProps) {
    const [series, setSeries] = useState<any[]>([]);
    console.log(seriesOneLapOne);
    const [options, setOptions] = useState<ApexOptions>({
      chart: {
        type: 'line',
        toolbar: {
          show: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: label || 'No label provided',
        align: 'left',
        style: {
          color: '#F6F6F6' // Set the font color to blue
        }
      },
      markers: {
        size: 0
      },
      xaxis: {
        range: 10,
        type: 'numeric',
        tickAmount: 'dataPoints',
        tickPlacement: 'on',
        labels: {
          style: {
            colors: ['#F6F6F6'] // Set the font color of x-axis labels to blue
          }
        }
      },
      yaxis: {
        min: 0,
        max: 10,
        labels: {
          style: {
            colors: ['#F6F6F6'] // Set the font color of x-axis labels to blue
          }
        }
      }
    });
  
    useEffect(() => {
      if (numberOfStreams === 1) {
        setSeries([
          {
            name: 'Throttle',
            data: seriesOneLapOne
          }
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: {
            ...prevOptions.yaxis,
            min: expectedMinValue,
            max: expectedMaxValue
          },
          colors: ['#99C2A2'],
          tooltip: {
            shared: false,
            intersect: true,
            x: {
              show: false
            }
          },title: {
            text: label || 'No label provided',
            align: 'left',
            style: {
              color: '#F6F6F6' // Set the font color to blue
            }
          },
        }));
      } else if (numberOfStreams === 2) {
        setSeries([
          {
            name: 'Column A',
            data: seriesOneLapOne,
            
          },
          {
            name: 'Column B',
            data: seriesTwoLapOne
          },
          
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: [
            {
              seriesName: 'Column A',
              min: expectedMinValue,
              max: expectedMaxValue,
              axisTicks: {
                show: true,
                style: {
                    color: '#F6F6F6' // Set the font color to blue
                  }
              },
              axisBorder: {
                show: true,
                style: {
                    color: '#F6F6F6' // Set the font color to blue
                  }
              },
              title: {
                text: leftLabel,
                style: {
                    color: '#F6F6F6' // Set the font color to blue
                  }
              }
            },
            {
              opposite: true,
              seriesName: 'Column B',
              min: expectedMinValueTwo,
              max: expectedMaxValueTwo,
              axisTicks: {
                show: true,
                style: {
                    color: '#F6F6F6' // Set the font color to blue
                  }
              },
              axisBorder: {
                show: true,
                style: {
                    color: '#F6F6F6' // Set the font color to blue
                  }
              },
              title: {
                text: rightLabel,
                style: {
                    color: '#F6F6F6' // Set the font color to blue
                  }
              }
            }
          ],
          colors: ['#99C2A2', '#C5EDAC', '#66C7F4'],
          tooltip: {
            shared: false,
            intersect: true,
            x: {
              show: false
            }
          },title: {
            text: 'this is a label',
            align: 'left',
            style: {
              color: '#F6F6F6' // Set the font color to blue
            }
          },stroke: {
            curve: ['stepline','straight']
          },
        }));
      }else if (numberOfStreams === 4){
        setSeries([
          {
            name: 'Column A',
            data: seriesOneLapOne,
            
          },
          {
            name: 'Column B',
            data: seriesTwoLapOne
          },
          {
            name: 'Column C',
            data: seriesOneLapTwo,
            
          },
          {
            name: 'Column D',
            data: seriesTwoLapTwo
          },
          
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: [
            {
              seriesName: 'Column A',
              min: expectedMinValue,
              max: expectedMaxValue,
              axisTicks: {
                show: true,
                style: {
                    color: '#F6F6F6' // Set the font color to blue
                  }
              },
              axisBorder: {
                show: true,
                style: {
                    color: '#F6F6F6' // Set the font color to blue
                  }
              },
              title: {
                text: leftLabel,
                style: {
                    color: '#F6F6F6' // Set the font color to blue
                  }
              }
            },
            {
              opposite: true,
              seriesName: 'Column B',
              min: expectedMinValueTwo,
              max: expectedMaxValueTwo,
              axisTicks: {
                show: true,
                style: {
                    color: '#F6F6F6' // Set the font color to blue
                  }
              },
              axisBorder: {
                show: true,
                style: {
                    color: '#F6F6F6' // Set the font color to blue
                  }
              },
              title: {
                text: rightLabel,
                style: {
                    color: '#F6F6F6' // Set the font color to blue
                  }
              }
            }
          ],
          colors: ['#99C2A2', '#C5EDAC', '#66C7F4','#F6F6F6'],
          tooltip: {
            shared: false,
            intersect: true,
            x: {
              show: false
            }
          },title: {
            text: label || 'No label provided',
            align: 'left',
            style: {
              color: '#F6F6F6' // Set the font color to blue
            }
          },stroke: {
            curve: ['stepline','straight','stepline','straight']
          },
        }));
      }
    }, [numberOfStreams, seriesOneLapOne, seriesTwoLapOne, expectedMinValue, expectedMaxValue, expectedMinValueTwo, expectedMaxValueTwo]);
  
    return (
      <>
        <Box sx={{ backgroundColor: 'black' }}>
          <Box sx={{ p: 1 }}>
            <DynamicReviewChart series={series} options={options} height={height} label={label} />
          </Box>
        </Box>
      </>
    );
  }