
export function getOffsetY(conditions: gsap.Conditions | undefined): any {
    if (conditions === undefined) return
    switch (true) {
        case conditions.isXS:
            return 112;
        case conditions.isMD:
            return 119;
        case conditions.isLG:
            return 125;
        case conditions.is2LG:
            return 133;
        case conditions.isXl:
            return 142;
        case conditions.is2XL:
            return 145;
        case conditions.is3XL:
            return 153;
        case conditions.is4Xl:
            return 153;
        default: return 153
    }
};

export function getPositionFixed(conditions: gsap.Conditions | undefined): any {
    if (!conditions) return "top top+=100px";
    switch (true) {
        case conditions.isXS:
            return "top top+=64px";
        case conditions.isMD:
            return "top top+=80px";
        case conditions.isLG:
            return "top top+=84px";
        case conditions.is2LG:
            return "top top+=88px";
        case conditions.isXl:
            return "top top+=92px";
        case conditions.is2XL:
            return "top top+=100px";
        case conditions.is3XL:
            return "top top+=100px";
        case conditions.is4Xl:
            return "top top+=100px";
        default: return "top top+=100px"
    };
}




