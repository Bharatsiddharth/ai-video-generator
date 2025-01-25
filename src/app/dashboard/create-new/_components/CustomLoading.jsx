import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'


const CustomLoading = ({ loading }) => {
    return (
        <AlertDialog open={loading} >

            <AlertDialogContent>
            <AlertDialogTitle>
            <div className='bg-white flex flex-col items-center my-10 justify-center'>
                    <Image alt='loading' src={'/progress.gif'} width={100} height={100} />
                    <h2>Generating Your Video... don't refresh</h2>
                </div>
            </AlertDialogTitle>
                
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default CustomLoading