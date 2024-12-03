
import styled from "styled-components"
import { Paragraph } from "../atoms/Paragraph"
import { useEffect, useState } from "react"
import { DashboardRequest } from "../../Http/request/Dashboard"



const ContainerCard = styled.div`
display:flex;
width:100%;
`

const ItemCard = styled.div`
padding:20px;
height:100px;
border: 1px solid #D2D2D2;
border-radius: 8px;
margin:10px;
box-shadow: 0 1px 10px rgb(0 0 0 / 0.25);
`
const ItemCardValue = styled.div`
padding:20px;
border-radius: 8px;
margin:10px;
`


export const Card = ({selectProducerValues}:any) => {
    const [totalFarms, setTotalFarms] = useState(0);
    const [totalArea, setTotalArea] = useState(0);
    const [totalProducers, setTotalProducers] = useState(0);


    useEffect(() => {
        const fetchDashboardData = async () => {
            const dashboardRequest = new DashboardRequest();

            try {
                const [farmsTotal, areaTotal,producersDash] = await Promise.all([
                    dashboardRequest.getTotalFarms(),
                    dashboardRequest.getTotalArea(),
                    dashboardRequest.getAllProducers()
                ]);

                setTotalFarms(farmsTotal.quantityFarms);
                setTotalArea(areaTotal.quantityTotalAreaFarms)
                setTotalProducers(producersDash.totalProducers)

            
            } catch (error) {
                console.error("Erro ao buscar dados do dashboard:", error);
            }
        };

        fetchDashboardData();
    }, [selectProducerValues]);


    return (
        <ContainerCard>
        <ItemCard>
            <Paragraph>Quantidade de Fazendas Cadastrada</Paragraph>
            <ItemCardValue>
                <Paragraph>{totalFarms ?? 0}</Paragraph>
            </ItemCardValue>
        </ItemCard>
        <ItemCard>
            <Paragraph>Total de fazendas em hectares (área total)</Paragraph>
            <ItemCardValue>
                <Paragraph>{(totalArea ? totalArea / 10000 : 0).toFixed(2)} (ha)</Paragraph>
            </ItemCardValue>
        </ItemCard>
        <ItemCard>
            <Paragraph>Quantidade de Produtor Rural Cadastrado</Paragraph>
            <ItemCardValue>
                <Paragraph>{totalProducers ?? 0}</Paragraph>
            </ItemCardValue>
        </ItemCard>
    </ContainerCard>
    

    )
}