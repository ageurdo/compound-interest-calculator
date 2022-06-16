import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Slider, InputNumber, Row, Col, Button, Badge, Card } from 'antd';
import { SliderWithInput } from '../components/SliderWithInput';

type Props = {
    PV: number,
    i: number,
    n: number,
    PMT: number,
};

export const Home: React.FC = () => {

    // FV = future value
    // PMT = payment per period
    // n = number of months of application
    // i = fixed rate % (per month)
    // PV = present value

    const { register, handleSubmit, watch, control, setValue, formState: { errors } } = useForm<Props>();
    const [fv, setFv] = useState('');
    const [totalInvested, setTotalInvested] = useState('');
    const [totalInterest, setTotalInterest] = useState('');
    const [monthly, setMonthly] = useState(true);
    const [inputValue, setInputValue] = useState({
        PV: 0,
        i: 0,
        n: 0,
        PMT: 0
    });

    const currency = new Intl.NumberFormat(
        'pt-BR',
        {
            style: 'currency',
            currency: 'BRL',
        }
    );

    const submitForm: SubmitHandler<Props> = (data) => {
        FV(data);
    }

    function FV({ PMT, i, n, PV }: Props) {

        let tax = i / 100; //convert to percentage
        if (!monthly)
            n = n * 12
        let FV = ((PV * (Math.pow(1 + tax, n)))) + ((PMT * (Math.pow(1 + tax, n) - 1)) / tax);
        let totalInvested = (n * PMT) + +PV;

        setTotalInterest(() => currency.format(+FV - +totalInvested));
        setTotalInvested(currency.format(totalInvested));
        setFv(currency.format(FV));

        return;
    }

    function formatter(value: number | bigint | undefined) {
        return `${currency.format(value ? value : 0)}`;
    }

    const getChangeHandlerWithEvent = (name: "PV" | "i" | "n" | "PMT", value: number) => {
        setValue(name, value);

        switch (name) {
            case "PV":
                setInputValue((old) => ({ ...old, PV: value }))
                break;
            case "i":
                setInputValue((old) => ({ ...old, i: value }))
                break;
            case "n":
                setInputValue((old) => ({ ...old, n: value }))
                break;
            case "PMT":
                setInputValue((old) => ({ ...old, PMT: value }))
                break;
            default:
                break;
        }
    };

    const changePeriod = () => {
        setMonthly(() => !monthly);
        console.log('Entrou:', monthly)
    }

    return (
        <div style={{ display: 'flex', flex: 1, placeContent: 'center', placeItems: 'center', flexDirection: 'column', height: '100vh', backgroundColor: '#F9FBFC', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', maxWidth: '600px', width: '100%', padding: '24px 16px', justifyContent: 'space-between' }}>
                <span style={{ lineHeight: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h1 style={{ textAlign: 'center', lineHeight: '1.5rem' }}>JUROS<br></br>COMPOSTOS</h1>
                    <h3 style={{ marginTop: '-8px', color: '#b3b2bf' }}>Valor futuro</h3>
                </span>

                <form onSubmit={handleSubmit(submitForm)}
                    style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0 24px' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                        <SliderWithInput
                            tipFormatter={formatter}
                            inputValue={typeof inputValue.PV === 'number' ? inputValue.PV : Number(0)}
                            onBlur={(e) => { getChangeHandlerWithEvent("PV", Number(e.target.value)) }}
                            onChange={(e) => getChangeHandlerWithEvent("PV", e)}
                            minSlider={0}
                            maxSlider={10000}
                            minInput={0}
                            maxInput={1000000000}
                            stepSlider={50}
                            stepInput={10}
                            simbol="R$"
                        >
                            Valor presente
                        </SliderWithInput>

                        <SliderWithInput
                            tipFormatter={formatter}
                            inputValue={typeof inputValue.i === 'number' ? inputValue.i : Number(0)}
                            onBlur={(e) => { getChangeHandlerWithEvent("i", Number(e.target.value)) }}
                            onChange={(e) => getChangeHandlerWithEvent("i", e)}
                            minSlider={0}
                            maxSlider={20}
                            minInput={0}
                            maxInput={100}
                            stepSlider={0.1}
                            stepInput={0.1}
                            simbol="%"
                        >
                            Taxa de juros
                        </SliderWithInput>

                        <SliderWithInput
                            tipFormatter={formatter}
                            inputValue={typeof inputValue.PMT === 'number' ? inputValue.PMT : Number(0)}
                            onBlur={(e) => { getChangeHandlerWithEvent("PMT", Number(e.target.value)) }}
                            onChange={(e) => getChangeHandlerWithEvent("PMT", e)}
                            minSlider={0}
                            maxSlider={5000}
                            minInput={0}
                            maxInput={100000}
                            stepSlider={50}
                            stepInput={50}
                            simbol="R$"

                        >
                            Aportes mensais
                        </SliderWithInput>


                        <SliderWithInput
                            tipFormatter={formatter}
                            inputValue={typeof inputValue.n === 'number' ? inputValue.n : Number(0)}
                            onBlur={(e) => { getChangeHandlerWithEvent("n", Number(e.target.value)) }}
                            onChange={(e) => getChangeHandlerWithEvent("n", e)}
                            minSlider={0}
                            maxSlider={240}
                            minInput={0}
                            maxInput={1200}
                            stepSlider={1}
                            stepInput={1}
                            simbol=""
                            onPressEnter={() => { handleSubmit(submitForm)(); }}
                        >
                            <div onClick={() => changePeriod()}>
                                <Badge.Ribbon text={monthly ? 'Mês*' : 'Ano*'} style={{ zIndex: 5, userSelect: 'none' }} color={'#A27CCD'} />
                            </div>
                            Período em
                        </SliderWithInput>

                    </div>

                    {errors.n && <span>Quantidade de meses é obrigatória</span>}
                    {errors.i && <span>Taxa de juros é obrigatória</span>}

                    <Button
                        size='large'
                        type="primary"
                        onClick={() => { handleSubmit(submitForm)(); }}
                        style={{ backgroundColor: '#322E54', border: 'none', margin: '16px 0 0 0', height: '60px' }}
                    >Calcular
                    </Button>


                </form>
            </div >

            <div>
                <h2>Valor futuro: {fv}</h2>
                <h2>Total Investido: {totalInvested}</h2>
                <h2>Total de Juros: {totalInterest}</h2>
            </div>
        </div >
    );
}
