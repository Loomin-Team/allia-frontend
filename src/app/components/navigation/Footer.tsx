import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className={"py-14 text-center justify-center px-4"}>
            <p className={"text-foreground-muted text-xl font-semibold"}>© {currentYear} AlliA by Loomin. All Rights Reserved.</p>
        </div>
    )
}
export default Footer
