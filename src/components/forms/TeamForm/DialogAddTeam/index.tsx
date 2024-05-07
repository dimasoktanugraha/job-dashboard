import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { teamFormSchema } from '@/lib/form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { PlusIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

interface DialogAddTeamProps {}

const DialogAddTeam : FC<DialogAddTeamProps> = ({}) =>  {

    const form = useForm<z.infer<typeof teamFormSchema>>({
        resolver: zodResolver(teamFormSchema)
    })

	const { data: session } = useSession();
	const { toast } = useToast();
	const router = useRouter();

    const onSubmit = async (val: z.infer<typeof teamFormSchema>) => {
        try {
			const body = {
				...val,
				companyId: session?.user.id,
			};

			await fetch("/api/company/teams", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			toast({
				title: "Success",
				description: "Add member success",
			});

            await router.back()
			await router.refresh()
		} catch (error) {
			toast({
				title: "Error",
				description: "Please try again",
			});
			console.log(error);
		}
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className='w-4 h-4' />
                    Add Member
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add new team</DialogTitle>
                <DialogDescription>
                    Fill the field to add new team
                </DialogDescription>
                </DialogHeader>

                <Separator />

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Name" 
                                            {...field} 
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='position'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Position</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Position" 
                                            {...field} 
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className='grid grid-cols-2 gap-3'>
                            <FormField
                                control={form.control}
                                name='instagram'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instagram</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Instagram" 
                                                {...field} 
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='linkedin'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>LinkedIn</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="LinkedIn" 
                                                {...field} 
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button>Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

        // <Form {...form}>
        //     <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        //         <FieldInput
        //             title='Basic Information' 
        //             subtitle='This company information that you can update anytime'
        //         >
        //             <div className='space-y-5'>
        //                 <FormField
        //                     control={form.control}
        //                     name='facebook'
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>Facebook</FormLabel>
        //                             <FormControl>
        //                                 <Input 
        //                                     className='w-[450px]'
        //                                     placeholder="http://facebook.com" 
        //                                     {...field} 
        //                                 />
        //                             </FormControl>
        //                         </FormItem>
        //                     )}
        //                 />
        //                 <FormField
        //                     control={form.control}
        //                     name='instagram'
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>Instagram</FormLabel>
        //                             <FormControl>
        //                                 <Input 
        //                                     className='w-[450px]'
        //                                     placeholder="http://instagram.com" 
        //                                     {...field} 
        //                                 />
        //                             </FormControl>
        //                         </FormItem>
        //                     )}
        //                 />
        //                 <FormField
        //                     control={form.control}
        //                     name='linkedIn'
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>LinkedIn</FormLabel>
        //                             <FormControl>
        //                                 <Input 
        //                                     className='w-[450px]'
        //                                     placeholder="http://linkedin.com" 
        //                                     {...field} 
        //                                 />
        //                             </FormControl>
        //                         </FormItem>
        //                     )}
        //                 />
        //                 <FormField
        //                     control={form.control}
        //                     name='twitter'
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>Facebook</FormLabel>
        //                             <FormControl>
        //                                 <Input 
        //                                     className='w-[450px]'
        //                                     placeholder="http://twitter.com" 
        //                                     {...field} 
        //                                 />
        //                             </FormControl>
        //                         </FormItem>
        //                     )}
        //                 />
        //                 <FormField
        //                     control={form.control}
        //                     name='youtube'
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>Facebook</FormLabel>
        //                             <FormControl>
        //                                 <Input 
        //                                     className='w-[450px]'
        //                                     placeholder="http://youtube.com" 
        //                                     {...field} 
        //                                 />
        //                             </FormControl>
        //                         </FormItem>
        //                     )}
        //                 />
        //             </div>
        //         </FieldInput>

        //         <div className='flex justify-end'>
        //             <Button size='lg'>Save Changes</Button>
        //         </div>
        //     </form>
        // </Form>
    )
}

export default DialogAddTeam