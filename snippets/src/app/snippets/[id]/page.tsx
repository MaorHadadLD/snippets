import {db} from '@/db';

interface SnippetShowPageProps {
    params: {
        id: string;
    }
}


export default async function SnippetShowPage(props: SnippetShowPageProps){
    return <div>Show a Snippet</div>
}