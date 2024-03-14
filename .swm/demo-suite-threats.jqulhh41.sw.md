---
title: Demo Suite - Threats
---
# Detect Threats

<SwmSnippet path="/src/demo-data/ThreatAndMetrics.tsx" line="513">

---

Black Dice Cyber provides robust protection against a variety of cyber threats. We detect and defend against up to 15 different types of dangers, including Apps firewalled, Device firewalled, Malware site blocked, Device abnormality identified, Unauthorised access request refused, App install blocked, Suspicious data leak, Device vulnerability found, Command and Control server blocked, Remote access server blocked, Phishing site blocked, Botnet site blocked, Spam generator site blocked, Adware site blocked, and File hosting site blocked.

Navigate to this path to see the POST request <SwmPath>[src/demo-data/ThreatAndMetrics.tsx](/src/demo-data/ThreatAndMetrics.tsx)</SwmPath>

```tsx
            const threat = {
              deviceId: randomDeviceId.deviceId,
              threatType: randomThreat.threatType,
              key: randomThreat.key,
              description: `demo.${randomThreat.key}.com blocked by BlackDice Shield`,
              action: "WARN:BLOCK_SITE",
              createdAt: createdAtDate,
              updatedAt: updatedAtDate,
            };
```

---

</SwmSnippet>

## ARGUMENTS :&nbsp;

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="514:1:1" line-data="              deviceId: randomDeviceId.deviceId,">`deviceId`</SwmToken>

> The GET request retrieves the <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="514:1:1" line-data="              deviceId: randomDeviceId.deviceId,">`deviceId`</SwmToken> of the device where the incoming threats are detected.

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="515:1:1" line-data="              threatType: randomThreat.threatType,">`threatType`</SwmToken>

> The type of threat that is detected is written in full, for example: 'Phishing site blocked'.

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="516:1:1" line-data="              key: randomThreat.key,">`key`</SwmToken>

> The <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="516:1:1" line-data="              key: randomThreat.key,">`key`</SwmToken> of the threat is an abbreviated version of the <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="515:1:1" line-data="              threatType: randomThreat.threatType,">`threatType`</SwmToken> , for example: "ph_site".

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="517:1:1" line-data="              description: `demo.${randomThreat.key}.com blocked by BlackDice Shield`,">`description`</SwmToken>

> Threats are often detected through incoming pop up alerts or spam messages. The description here declares the URL of the incoming cyber attack and states that it has been blocked by the BlackDice Shield.

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="518:1:1" line-data="              action: &quot;WARN:BLOCK_SITE&quot;,">`action`</SwmToken>

> The action represents what was done in order to tackle the incoming threats. The typical action is the site that alerted the threat has been BLOCKED.

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="519:1:1" line-data="              createdAt: createdAtDate,">`createdAt`</SwmToken>

> The <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="519:1:1" line-data="              createdAt: createdAtDate,">`createdAt`</SwmToken> date is the recorded date and time of the incoming threat.

### <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="520:1:1" line-data="              updatedAt: updatedAtDate,">`updatedAt`</SwmToken>

> The <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="520:1:1" line-data="              updatedAt: updatedAtDate,">`updatedAt`</SwmToken>date is the recorded date and time of the action that was taken after detecting the incoming threat.

&nbsp;

## EXAMPLE :&nbsp;

> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="514:1:1" line-data="              deviceId: randomDeviceId.deviceId,">`deviceId`</SwmToken> : 16173,&nbsp;
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="515:1:2" line-data="              threatType: randomThreat.threatType,">`threatType:`</SwmToken> "Device vulnerability found",&nbsp;
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="516:1:1" line-data="              key: randomThreat.key,">`key`</SwmToken> : "dev_vuln",&nbsp;
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="517:1:1" line-data="              description: `demo.${randomThreat.key}.com blocked by BlackDice Shield`,">`description`</SwmToken> : "demo.dev_vuln.com blocked by BlackDice Shield",&nbsp;
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="518:1:1" line-data="              action: &quot;WARN:BLOCK_SITE&quot;,">`action`</SwmToken> : "WARN:BLOCK_SITE",&nbsp;
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="519:1:1" line-data="              createdAt: createdAtDate,">`createdAt`</SwmToken>: "2024-03-07 15:43:25",&nbsp;
>
> <SwmToken path="/src/demo-data/ThreatAndMetrics.tsx" pos="520:1:1" line-data="              updatedAt: updatedAtDate,">`updatedAt`</SwmToken>: "2024-03-07 15:43:25"

&nbsp;

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBRGVtby1TdWl0ZSUzQSUzQWFqYXlTYXNhbg==" repo-name="Demo-Suite"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
