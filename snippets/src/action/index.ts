'use server';

import {redirect} from 'next/navigation';
import {db} from '@/db';

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: {id},
        data: {code}
    });

    redirect(`/snippet/${id}`);
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: {id},
    });

    redirect('/');  
}

export async function createSnippet(formState: {message: string}, FormData: FormData){
    try{
            // Check the user`s input and make sure they're valid
            const title = FormData.get('title');
             const code = FormData.get('code') ;

                if (typeof title !== 'string' || title.length < 3) {
                    return {
                        message: 'title must be longer',
                    };
                }
                if (typeof code !== 'string' || code.length < 10) {
                        return {
                                message: 'Code must be longer',
                            };
                }  


            // Create a new record in the database
                 await db.snippet.create({
                    data: {
                     title,
                      code
                    },
                });
            } catch (err: unknown) {
                if (err instanceof Error) {
                    return {
                        message: err.message
                    };
                }else {
                    return {
                        message: 'Something went wrong...'
                    }
                }
            }

    // Redirect the user back to the root route
    redirect('/');
}