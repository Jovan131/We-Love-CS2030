import Card from "./Card"
import { prisma } from "@/app/db";

type AppProps = {
    igInfos: {
        id: string,
        name: string,
        category: string,
        numOfSessionsPerWeek: number,
    }[],
}

function getIg(category: string) {
    return prisma.iG.findMany({
        where: {
            category: category,
        }   
    })
}

const Container: React.FC<AppProps> = ({igInfos}) => {

    return (
        <div className="grid grid-cols-4">
            {igInfos.map((igInfo) => <Card key={igInfo.id} igInfo={igInfo}/>)}
        </div>
    )
}

export default Container