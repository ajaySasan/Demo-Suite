---
title: Demo Suite - Device
---
# Add a Device

<SwmSnippet path="/src/demo-data/Devices.tsx" line="304">

---

When creating an account, you have the option to add one or multiple devices, including phones, tablets, laptops, desktops, game consoles, and wearables such as smartwatches. Our user interface (UI) actively monitors incoming threats to these devices, promptly alerting users to potential dangers. Additionally, users can analyse device metrics for a comprehensive understanding of their device's security status.

Navigate to this path to see the POST request <SwmPath>[src/demo-data/Devices.tsx](/src/demo-data/Devices.tsx)</SwmPath>

```tsx
        const deviceData = {
          name: `${getRandomDeviceName()} ${randomDeviceDescription.type}`,
          description: randomDeviceDescription.type,
          macAddress: serialNumber(),
          phoneNumber: phoneNumber,
          deviceCategoryId: randomDeviceDescription.cat,
          webFilter: randomAgeGroup,
          rules: [],
          haandle: newRandomId,
        };
```

---

</SwmSnippet>

## Arguments :

### <SwmToken path="/src/demo-data/Devices.tsx" pos="305:1:1" line-data="          name: `${getRandomDeviceName()} ${randomDeviceDescription.type}`,">`name`</SwmToken>

> After adding a device, you can customize it by assigning a name of your choice.

### <SwmToken path="/src/demo-data/Devices.tsx" pos="306:1:1" line-data="          description: randomDeviceDescription.type,">`description`</SwmToken>

> Afterward, a description is automatically generated, detailing the make and model of the added device.

### <SwmToken path="/src/demo-data/Devices.tsx" pos="307:1:1" line-data="          macAddress: serialNumber(),">`macAddress`</SwmToken>

> Subsequently, the MAC address of the device is automatically registered to your account.&nbsp;

### <SwmToken path="/src/demo-data/Devices.tsx" pos="308:1:1" line-data="          phoneNumber: phoneNumber,">`phoneNumber`</SwmToken>

> &nbsp;The user will be prompted to enter a phone number for the device holder.

### <SwmToken path="/src/demo-data/Devices.tsx" pos="309:1:1" line-data="          deviceCategoryId: randomDeviceDescription.cat,">`deviceCategoryId`</SwmToken>

> Each device is assigned a category number ranging from 1 to 9, with distinct categories for different device types such as phones and laptops, enabling efficient sorting by device type.

### <SwmToken path="/src/demo-data/Devices.tsx" pos="310:1:1" line-data="          webFilter: randomAgeGroup,">`webFilter`</SwmToken>

> A web filter is implemented to ascertain the age group of the device holder, categorizing them as UNDER12, EARLYTEEN, YOUNGADULT, or NOSHIELD

### <SwmToken path="/src/demo-data/Devices.tsx" pos="311:1:1" line-data="          rules: [],">`rules`</SwmToken>

> When a device is added, any assigned rules are listed under the device details.

### <SwmToken path="/src/demo-data/Devices.tsx" pos="312:1:1" line-data="          haandle: newRandomId,">`haandle`</SwmToken>

> The handle assigns the new device to the user's account.

&nbsp;

## EXAMPLE :

> <SwmToken path="/src/demo-data/Devices.tsx" pos="305:1:1" line-data="          name: `${getRandomDeviceName()} ${randomDeviceDescription.type}`,">`name`</SwmToken> : "Isla's <SwmToken path="/src/demo-data/Devices.tsx" pos="75:18:18" line-data="    { vendor: &quot;Apple Inc.&quot;, type: &quot;iPhone 5S&quot;, cat: 1 },">`iPhone`</SwmToken> 14 Pro Max",
>
> <SwmToken path="/src/demo-data/Devices.tsx" pos="306:1:1" line-data="          description: randomDeviceDescription.type,">`description`</SwmToken> : "iPhone 14 Pro Max",
>
> <SwmToken path="/src/demo-data/Devices.tsx" pos="307:1:1" line-data="          macAddress: serialNumber(),">`macAddress`</SwmToken> : "1C:BD:B8:D8:97:DC",
>
> <SwmToken path="/src/demo-data/Devices.tsx" pos="308:1:1" line-data="          phoneNumber: phoneNumber,">`phoneNumber`</SwmToken> : 07288687201,
>
> <SwmToken path="/src/demo-data/Devices.tsx" pos="309:1:1" line-data="          deviceCategoryId: randomDeviceDescription.cat,">`deviceCategoryId`</SwmToken> : 1,
>
> <SwmToken path="/src/demo-data/Devices.tsx" pos="310:1:1" line-data="          webFilter: randomAgeGroup,">`webFilter`</SwmToken> : "EARLYTEEN",
>
> <SwmToken path="/src/demo-data/Devices.tsx" pos="311:1:1" line-data="          rules: [],">`rules`</SwmToken> : \[ \],
>
> <SwmToken path="/src/demo-data/Devices.tsx" pos="312:1:1" line-data="          haandle: newRandomId,">`haandle`</SwmToken> : 10825

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBRGVtby1TdWl0ZSUzQSUzQWFqYXlTYXNhbg==" repo-name="Demo-Suite"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
