import api from '../../http/api'
import { StyledCataloguer } from './StyledCataloguer'
import React, { useState, useEffect } from 'react';

async function getApuracao() {
    var data = await api.get(`/apuracao`)
    return data.data;
}

export default function Cataloguer() {
    const [apuracao, setApuracao] = useState("0")
    const [porcentagem1, setPorcentagem1] = useState("0")
    const [porcentagem2, setPorcentagem2] = useState("0")


    var data = getApuracao()
    useEffect(() => {
        data.then(function (result) {
            setApuracao(result)
            setPorcentagem1((100 * (result.candidato1 / (result.candidato1 + result.candidato2))).toFixed(2))
            setPorcentagem2((100 * (result.candidato2 / (result.candidato1 + result.candidato2))).toFixed(2))
        })
    }, [])




    return (
        <StyledCataloguer>
            <h1>Apuração de votos</h1>
            <h2></h2>
            <div className='containerGeneral'>
                <div className='candidatoContainer'>
                    <div className='fotoCandidato'><img src="https://i.pinimg.com/736x/e7/8c/0d/e78c0d599913316df469b3e7606dde8c.jpg"></img></div>
                    <h2>Lula Molusco</h2>
                    <h3>{porcentagem1}% dos votos validos</h3>
                    <h4>{apuracao.candidato1} votos</h4>
                </div>
                <div className='candidatoContainer'>
                    <div className='fotoCandidato'><img src="https://cdn.shopify.com/s/files/1/0054/4371/5170/products/PatrickStar_467pin.png?v=1627414164"></img></div>
                    <h2>Patrick Estrela</h2>
                    <h3>{porcentagem2}% dos votos validos</h3>
                    <h4>{apuracao.candidato2} votos</h4>
                </div>
            </div>
            <div className='containerGeneral'>
                <div className='brancosENulos'>
                    <h4>
                        {apuracao.brancos} votos em branco
                    </h4>
                </div>
                <div className='brancosENulos'>
                    <h4>
                        {apuracao.nulos} votos nulos
                    </h4>
                </div>
            </div>
        </StyledCataloguer>
    )
} 
