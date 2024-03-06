export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG
export const pageview = (url) => {
    window.dataLayer.push({
        event: 'pageviewupdated',
        page: url,
    });
};

export const event = ({ action, category, label, value }) => {
    console.log('Event triggered:', { action, category, label, value });

    window.dataLayer.push({
        event: action,
        category,
        label,
        value,
    });
};
