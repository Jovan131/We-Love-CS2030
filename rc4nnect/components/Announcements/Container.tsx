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
        <div className="grid grid-cols-4">
            {announcements.map((announcement) => <Card key={announcement.id} announcement={announcement} email={email} />)}
        </div>
    )
}

export default Container;