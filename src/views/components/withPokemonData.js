import { useEffect, useMemo, useState } from "react";

const withPokemonData = (WrappedComponent, fecthData) => {
    return (props) => {

        const { pokemon } = props;
        const [data, setData] = useState(undefined)
        const [loading, setLoading] = useState(true)
        const fetchInfo = async () => {
            const response = await fecthData(pokemon);
            setData(response);
        }
        useEffect(() => {
            setLoading(true);
            fetchInfo();
        }, [pokemon]);
        useEffect(() => {
            data && setLoading(false);
        }, [data])
        return (<WrappedComponent {...props} data={data} loading={loading} />)
    }

}



export default withPokemonData;