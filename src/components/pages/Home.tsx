import React, { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
    PV: number,
    i: number,
    n: number,
    PMT : number,
};

export const Home: React.FC<Props> = ({ PV, i, n, PMT }) => {

    // FV = future value
    // PMT = payment per period
    // n = number of months of application
    // i = fixed rate % (per month)
    // PV = present value

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Props>();
    const [fv, setFv] = useState('');
    const [totalInvested, setTotalInvested] = useState('');
    const [totalInterest, setTotalInterest] = useState('');
    
    const currency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const onSubmit: SubmitHandler<Props> = (data) => {
        FV(data);
    }

    function FV({ PMT , i, n, PV }: Props) {

        let tax = i / 100; //convert to percentage
        
        let FV = ((PV * (Math.pow(1 + tax, n)))) + ((PMT  * (Math.pow(1 + tax, n) - 1)) / tax);
        let totalInvested = (n*PMT) + +PV;
        setTotalInterest(() => currency.format(+FV - +totalInvested));
        
        setTotalInvested(currency.format(totalInvested));
        setFv(currency.format(FV));

        return;
    }


    return (
        <div style={{ display: 'flex', flex: 1, placeContent: 'center', placeItems: 'center', flexDirection: 'column', height: '100vh', backgroundColor: 'lightblue' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>

                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <div style={{ flexDirection: 'row' }}>
                        <input
                            type="text" {...register("PV")}
                            style={{ width: '200px' }}
                            placeholder='PV inicial'
                        />

                        <input
                            type="text" {...register("i", {required: true})}
                            style={{ width: '200px' }}
                            placeholder='Taxa de juros'
                        />
                    </div>

                    <div style={{ flexDirection: 'row' }}>

                        <input
                            type="text" {...register("PMT")}
                            style={{ width: '200px' }}
                            placeholder='Aporte mensal'
                        />

                        <input
                            type="Quantidade de meses" {...register("n", {required: true})}
                            style={{ width: '200px' }}
                            placeholder='Quantidade de meses'
                        />
                    </div>

                </div>

                {errors.n && <span>Quantidade de meses é obrigatória</span>}
                {errors.i && <span>Taxa de juros é obrigatória</span>}

                <input type="submit" style={{ width: '416px' }} />


            </form>

            <h2>Valor futuro: {fv}</h2>
            <h2>Total Investido: {totalInvested}</h2>
            <h2>Total de Juros: {totalInterest}</h2>

        </div>
    );
}