import React, { useEffect, useState } from 'react';

const DeviceInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState(null);

    useEffect(() => {
        // Access device information when the component mounts
        const userAgent = navigator.userAgent;
        const isMobileDevice = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(userAgent);
        const isTabletDevice = /Tablet|iPad/.test(userAgent);

        const deviceType = isMobileDevice ? 'Mobile' : (isTabletDevice ? 'Tablet' : 'Desktop');

        // Set the device information in the state
        setDeviceInfo({
            userAgent,
            isMobileDevice,
            isTabletDevice,
            deviceType,
        });
    }, []);

    if (!deviceInfo) {
        return null;
    }

    return (
        deviceInfo.deviceType
    );
};

export default DeviceInfo;
