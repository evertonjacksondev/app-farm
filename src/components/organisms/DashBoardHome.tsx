import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { ChartDash } from "../atoms/ChartDash";
import "react-multi-carousel/lib/styles.css";
import { Card } from "../molecules/Card";
import { DashboardRequest } from "../../Http/request/Dashboard";

const ContainerDashBoard = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  z-index:500;
`;

const ContainerDashBoardItem = styled.div`
  display: flex;
  justify-content: flex-start;

`;

const ItemDashBoard = styled.div`
  margin: 10px;
`;

interface FarmStateItem {
    UF: string;
    quantity: number;
}

interface IDashboardProps {
    selectProducerValues: any
}

export const DashBoards = ({ selectProducerValues }: IDashboardProps) => {
    const [farmsByState, setFarmsByState] = useState<string[][]>([]);
    const [farmsByCulture, setFarmsByCulture] = useState<string[][]>([]);
    const [farmsByLandUse, setFarmsByLandUse] = useState<any[][]>([]);

    const fetchDashboardData = async () => {
        const dashboardRequest = new DashboardRequest();

        try {
            const [farmsStateData, farmsCultureData, farmsLandUseData] = await Promise.all([
                dashboardRequest.getFarmsByState(),
                dashboardRequest.getFarmsByCulture(),
                dashboardRequest.getFarmsByLandUse(),
                dashboardRequest.getTotalFarms(),
                dashboardRequest.getTotalArea(),
            ]);

            setFarmsByState([['Estado', 'Quantidade'], ...farmsStateData.map((item: FarmStateItem) => [item.UF, Number(item.quantity)])]);

            setFarmsByCulture([
                ['Cultivo', 'Quantidade'],
                ...farmsCultureData.map((item: any) => [item.name, Number(item.quantity)])]);

            const used = farmsLandUseData.find((item: any) => item.used)?.used || 0;
            const unused = farmsLandUseData.find((item: any) => item.unused)?.unused || 0;

            setFarmsByLandUse([
                ['Status', 'Quantidade'],
                ['Solo Utilizado', used],
                ['Solo Nao utilizado', unused],

            ]);


        } catch (error) {
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [selectProducerValues]);

    return (
        <Fragment>
           
                    <ContainerDashBoard>
                        <ContainerDashBoardItem>
                            <ItemDashBoard>
                                <ChartDash
                                    data={farmsByState}
                                    options={{
                                        title: 'Distribuição de Fazendas por Estado',
                                        is3D: true,
                                    }}
                                />
                            </ItemDashBoard>
                            <ItemDashBoard>
                                <ChartDash
                                    data={farmsByCulture}
                                    options={{ title: "Cultivos em Alta", is3D: true }}
                                />
                            </ItemDashBoard>
                            <ItemDashBoard>
                                <ChartDash
                                    data={farmsByLandUse}
                                    options={{
                                        is3D: true,
                                        title: "Uso do Solo (Área agricultável e vegetação)",
                                    }}
                                />
                            </ItemDashBoard>

                        </ContainerDashBoardItem>

                    </ContainerDashBoard>
                    <ContainerDashBoard>
                        <ItemDashBoard>
                            <Card selectProducerValues={selectProducerValues} />
                        </ItemDashBoard>
                    </ContainerDashBoard>
            
        </Fragment>
    );
};
