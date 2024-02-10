const ValueRenderer = (props) => {
    let value = props.data.price * props.data.balance;

    let settings = {} 
    settings["notation"] = "compact";
    settings["compactDisplay"] = "short";
    settings["currencyDisplay"] = "narrowSymbol";

    settings["useGrouping"] = true;
    settings["minimumFractionDigits"] = 0;
    settings["maximumFractionDigits"] = 2;

    settings["style"] = "currency";
    settings["currency"] = "USD";
    
    let formatter = new Intl.NumberFormat("en-GB", settings);
    return  formatter.format(value);
};

const BalanceFormatter = (props) => {
    let settings = {} 
    settings["notation"] = "compact";
    settings["compactDisplay"] = "short";
    settings["currencyDisplay"] = "narrowSymbol";

    settings["useGrouping"] = true;
    settings["minimumFractionDigits"] = 0;
    settings["maximumFractionDigits"] = 6;
    
    let formatter = new Intl.NumberFormat("en-GB", settings);
    return  formatter.format(props.value);
}

const PriceFormatter = (props) => {
    let settings = {} 

    settings["useGrouping"] = true;
    settings["minimumFractionDigits"] = 0;
    settings["maximumFractionDigits"] = 4;

    settings["style"] = "currency";
    settings["currencyDisplay"] = "narrowSymbol";
    settings["currency"] = "USD";
    
    let formatter = new Intl.NumberFormat("en-GB", settings);
    return  formatter.format(props.value);
}

export { ValueRenderer, BalanceFormatter, PriceFormatter};