import Card from "./Card"

type AppProps = {
    igInfos: {
        id: string,
        name: string,
        category: string,
        numOfSessionsPerWeek: number,
        members: {email: string}[],
        subscribed: boolean,
    }[],
    email: string
}

const Container: React.FC<AppProps> = ({igInfos, email}) => {

    return (
        <div className="grid grid-cols-4">
            {igInfos.map((igInfo) => <Card key={igInfo.id} igInfo={igInfo} email={email} />)}
        </div>
    )
}

export default Container;