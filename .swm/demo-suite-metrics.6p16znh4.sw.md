---
title: Demo Suite - Metrics
---
# Metrics of Incoming Threats and Data

<SwmSnippet path="/src/demo-data/ThreatAndMetrics.tsx" line="486">

---

With our software at BlackDice Cyber, you gain the ability to analyse metric data regarding incoming cyber attacks and potential dangers to your routers or devices. This comprehensive analysis empowers you to take proactive steps in enhancing your security measures, aligning with the insights provided by the data.

Navigate to this path to see the POST request <SwmPath>[src/demo-data/ThreatAndMetrics.tsx](/src/demo-data/ThreatAndMetrics.tsx)</SwmPath>

```tsx
          metrics.push({
            deviceId: randomDeviceId.deviceId,
            mac: randomDeviceId.mac,
            signal: randomSignal(),
            txBitrate: txBitrate(),
            rxBitrate: rxBitrate(),
            txBytes: txByte(),
            rxBytes: rxByte(),
            createdAt: createdAtDate,
            updatedAt: updatedAtDate,
            rxBitRateAverage: randomRxBitRateAverage(),
            txBitRateAverage: randomTxBitRateAverage(),
            signalNum: signalNum(),
          });
```

---

</SwmSnippet>

## ARGUMENTS :&nbsp;

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="487:1:1" line-data="            deviceId: randomDeviceId.deviceId,">`deviceId`</SwmToken>

> The GET request retrieves the <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="514:1:1" line-data="              deviceId: randomDeviceId.deviceId,">`deviceId`</SwmToken> of the device where the metric data is analysed.

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="488:1:1" line-data="            mac: randomDeviceId.mac,">`mac`</SwmToken>

> Registers the metric data against the device mac address.

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="489:1:1" line-data="            signal: randomSignal(),">`signal`</SwmToken>

> The level of the threat is assessed against 3 levels - weak / medium / strong.

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="490:1:1" line-data="            txBitrate: txBitrate(),">`txBitrate`</SwmToken>

> Tx bitrate refers to the rate at which data is transmitted over a network interface or communication channel, typically measured in bits per second (bps), kilobits per second (kbps), megabits per second (Mbps), or gigabits per second (Gbps).

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="491:1:1" line-data="            rxBitrate: rxBitrate(),">`rxBitrate`</SwmToken>

> Rx bitrate refers to the rate at which data is received over a network interface or communication channel, typically measured in bits per second (bps), kilobits per second (kbps), megabits per second (Mbps), or gigabits per second (Gbps).

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="492:1:1" line-data="            txBytes: txByte(),">`txBytes`</SwmToken>

> "Tx bytes" refers to the total number of bytes transmitted from a device or network interface over a period of time, indicating the amount of data sent out from the source.

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="493:1:1" line-data="            rxBytes: rxByte(),">`rxBytes`</SwmToken>

> "Rx bytes" refers to the total number of bytes received by a device or network interface over a period of time, indicating the amount of data received by the device from an external source.

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="494:4:4" line-data="            createdAt: createdAtDate,">`createdAtDate`</SwmToken>

> The date and time that the metric data is conducted based on the incoming cyber attacks and threats.

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="495:4:4" line-data="            updatedAt: updatedAtDate,">`updatedAtDate`</SwmToken>

> The updated date and time of the metric data as new data is being refreshed into the database.

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="496:1:1" line-data="            rxBitRateAverage: randomRxBitRateAverage(),">`rxBitRateAverage`</SwmToken>

> "Rx bitrate average" is the average data reception rate over a given period, typically measured in bits per second.

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="497:1:1" line-data="            txBitRateAverage: randomTxBitRateAverage(),">`txBitRateAverage`</SwmToken>

> "Tx bitrate average" is the average data transmission rate over a specified time period, usually measured in bits per second.

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="498:4:4" line-data="            signalNum: signalNum(),">`signalNum`</SwmToken>

> need more info

&nbsp;

## EXAMPLES :&nbsp;

> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="487:1:1" line-data="            deviceId: randomDeviceId.deviceId,">`deviceId`</SwmToken> : 13138
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="488:1:1" line-data="            mac: randomDeviceId.mac,">`mac`</SwmToken> : "2A:3A:33:C6:CD:4A"
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="498:4:4" line-data="            signalNum: signalNum(),">`signalNum`</SwmToken>` `: "weak"
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="490:1:1" line-data="            txBitrate: txBitrate(),">`txBitrate`</SwmToken> : 6
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="491:1:1" line-data="            rxBitrate: rxBitrate(),">`rxBitrate`</SwmToken> : 22
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="492:1:1" line-data="            txBytes: txByte(),">`txBytes`</SwmToken> : 987572574
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="493:1:1" line-data="            rxBytes: rxByte(),">`rxBytes`</SwmToken> : 382985032
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="497:1:1" line-data="            txBitRateAverage: randomTxBitRateAverage(),">`txBitRateAverage`</SwmToken> : "low"
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="496:1:1" line-data="            rxBitRateAverage: randomRxBitRateAverage(),">`rxBitRateAverage`</SwmToken> : "high"
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="494:4:4" line-data="            createdAt: createdAtDate,">`createdAtDate`</SwmToken> : "2024-03-13 13:30:45"
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="495:4:4" line-data="            updatedAt: updatedAtDate,">`updatedAtDate`</SwmToken> : "2024-03-14 13:15:34"
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="498:4:4" line-data="            signalNum: signalNum(),">`signalNum`</SwmToken> : -71

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBRGVtby1TdWl0ZSUzQSUzQWFqYXlTYXNhbg==" repo-name="Demo-Suite"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
