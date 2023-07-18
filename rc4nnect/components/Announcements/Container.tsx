import Card from "./Card"

type AppProps = {
    announcements: {
        id: string,
        title: string,
        content: string,
        createdDateTime: Date,
        igName: string,
    }[],
    email: string
}

const Container: React.FC<AppProps> = ({announcements, email}) => {

    return (
        <div className="flex flex-col items-center w-full">
            {announcements.map((announcement) => <Card key={announcement.id} announcement={announcement} email={email} />)}
        </div>
    )
}

export default Container;