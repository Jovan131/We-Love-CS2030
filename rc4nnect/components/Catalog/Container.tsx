import Card from "./Card"

type AppProps = {
    igInfos: {
        id: string,
        name: string,
        category: string,
        numOfSessionsPerWeek: number,
    }[],
}

const Container: React.FC<AppProps> = ({igInfos}) => {

    return (
        <div className="grid grid-cols-4">
            {igInfos.map((igInfo) => <Card key={igInfo.id} igInfo={igInfo}/>)}
        </div>
    )
}

export default Container;