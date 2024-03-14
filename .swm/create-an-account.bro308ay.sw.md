---
title: Create an Account
---
<SwmSnippet path="/src/demo-data/Register.tsx" line="249">

---

By creating an account, you agree to register your email address, password, router serial number (for both Wi-Fi and wired connections), and operator account details. Your data will be securely stored in our database for seamless access and personalized service.

Navigate to this path to see the POST request <SwmPath>[src/demo-data/Register.tsx](/src/demo-data/Register.tsx)</SwmPath>/

```tsx
        const userData: Register = {
          email,
          pass,
          serialNumber: serialNum,
          referer: operatorIdUrl,
        };
```

---

</SwmSnippet>

## Arguments :

### <SwmToken path="/src/demo-data/Register.tsx" pos="250:1:1" line-data="          email,">`email`</SwmToken>

When creating an account, your email will serve as the login credential. A verification email will be sent to your provided email address, which is mandatory to validate the account upon initial login.

### <SwmToken path="/src/demo-data/Register.tsx" pos="172:9:9" line-data="  // Randomly generates a password">`password`</SwmToken>

When creating an account, your password must meet security criteria: a minimum of 8 characters including upper and lower case letters, numbers, and/or special characters. Your password will be securely stored in our database, protected by password hashing for enhanced security.

### <SwmToken path="/src/demo-data/Register.tsx" pos="252:1:1" line-data="          serialNumber: serialNum,">`serialNumber`</SwmToken>

When creating an account, your router's serial number is registered to connect the UI to our embedded cyber protection software. This information is securely stored in our database.

### <SwmToken path="/src/demo-data/Register.tsx" pos="253:1:1" line-data="          referer: operatorIdUrl,">`referer`</SwmToken>

When signing up, your account is assigned to a specific <SwmToken path="/src/demo-data/Register.tsx" pos="253:4:4" line-data="          referer: operatorIdUrl,">`operatorIdUrl`</SwmToken>, representing the organization providing your cyber protection. This ensures your account is associated with the designated operator for service provision.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBRGVtby1TdWl0ZSUzQSUzQWFqYXlTYXNhbg==" repo-name="Demo-Suite"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
