import { Fragment, useEffect, useState } from "react";
import { ModalHomeProducer } from "../organisms/ModalHomeProducer";
import { TableHome } from "../organisms/TableHome";
import { IconButton } from "../molecules/IconButton";
import { Container } from "../atoms/Container";
import { Item } from "../atoms/Item";
import { DashBoards } from "../organisms/DashBoardHome";
import { ModalHomeFarm } from "../organisms/ModalHomeFarm";
import { message } from "antd";
import { ModalHomeAgriculture } from "../organisms/ModalHomeAgriculture";
import { AgricultureRequest } from "../../Http/request/AgricultureRequest";
import { FarmRequest } from "../../Http/request/FarmRequest";

export const Agriculture = () => {
    const [selectProducerValues, setSelectProducerValues] = useState<any>([]);
    const [selectFarmValues, setSelectFarmValues] = useState([]);
    const [userValues, setUserValues] = useState([]);
    const agricultureRequest = new AgricultureRequest();
    const farmRequest = new FarmRequest();



    useEffect(() => {
        loadProducers();
    }, []);

    const loadProducers = () => {
        agricultureRequest
            .getAgricultureList(1, 10)
            .then((response: any) => {
                setUserValues(response.data)
            })
            .catch((error) => {
                console.error("Erro ao carregar lista de produtores:", error);
                message.error("Erro ao carregar produtores.");
            });


        farmRequest
            .listFarms(1, 10)
            .then((response) => {
                const formattedData = response.data.map((farm: any) => ({
                    key: farm.id,
                    name: farm.farmName,
                    arable: farm.arable
                }));


                setSelectProducerValues(formattedData)
                setSelectFarmValues(formattedData)
            })
            .catch((error) => {
                console.error("Erro ao carregar lista de produtores:", error);
                message.error("Erro ao carregar produtores.");
            });


    };

    const handleDelete = async (record: any) => {
        try {
            await agricultureRequest.deleteAgriculture(record.id);
            message.success(`Produtor ${record.name} excluído com sucesso.`);
            loadProducers();
        } catch (error) {
            console.error("Erro ao excluir produtor:", error);
            message.error("Erro ao excluir o produtor.");
        }
    };

    
    const columns = [
        {
            title: "Cultivo",
            dataIndex: "name",
            key: "name",
          
            width: "19%",
        },
        {
            title: " Nome da Fazenda",
            dataIndex: "farm",
            key: "farm",
            align: 'center',
            width: "19%",
            render: (_: string, record: any) => record.farm.farmName,
        },
        {
            title: "Nome do Produtor",
            dataIndex: "farm.farmName", 
            key: "farm.farmName",
            align: 'center',
            width: "19%",
            render: (_: string, record: any) => record.farm.producer.name,
        },
       
        {
            title: "Area Utilizada",
            dataIndex: "areaUsed",
            key: "areaUsed",
            align: 'center',
            width: "12%",
        },
        {
            title: "Ações",
            dataIndex: "action",
            align: 'center',
            key: "action",
            width: "12%",
            render: (_: any, record: any) => {
                return (
                    <Fragment>
                        <Container>

                            <Item>
                                <IconButton
                                    isLoadingIcon={false}
                                    tooltipTitle="Excluir Cultivo"
                                    iconName="delete"
                                    background="#970505"
                                    onClick={() => handleDelete(record)}
                                />
                            </Item>
                        </Container>
                    </Fragment>
                );
            },
        },
    ];

    return (
        <Fragment>
            <DashBoards selectProducerValues={selectProducerValues} />
            <ModalHomeFarm handleRefresh={loadProducers} selectValues={selectProducerValues} />
            <ModalHomeProducer handleRefresh={loadProducers} />
            <ModalHomeAgriculture handleRefresh={loadProducers} selectValues={selectFarmValues} />
            <TableHome selectProducerValues={selectProducerValues} handleRefresh={loadProducers} columns={columns} dataSource={userValues} />
        </Fragment>
    );
};
