import { Fragment, useEffect, useState } from "react";
import { ModalHomeProducer } from "../organisms/ModalHomeProducer";
import { TableHome } from "../organisms/TableHome";
import { IconButton } from "../molecules/IconButton";
import { Container } from "../atoms/Container";
import { Item } from "../atoms/Item";
import { DashBoards } from "../organisms/DashBoardHome";
import { ModalHomeFarm } from "../organisms/ModalHomeFarm";
import { ProducerRequest } from "../../Http/request/ProducerRequest";
import { message } from "antd";
import { ModalHomeAgriculture } from "../organisms/ModalHomeAgriculture";
import { FarmRequest } from "../../Http/request/FarmRequest";
import { useProviderGlobal } from "../../context/global.context";

export const Produtor = () => {
    const [selectProducerValues, setSelectProducerValues] = useState([]);
    const { isActiveModalProducer, setIsActiveModalProducer,setEditProducer } = useProviderGlobal();
    const [selectFarmValues, setSelectFarmValues] = useState([]);

    const [userValues, setUserValues] = useState([]);

    const producerRequest = new ProducerRequest();
    const farmRequest = new FarmRequest();


    useEffect(() => {
        loadProducers();
    }, []);

    const loadProducers = () => {
        producerRequest
            .getProducerList(1, 10)
            .then((response) => {
                const formattedData = response.data.map((producer: any) => ({
                    key: producer.id,
                    name: producer.name,
                    document: producer.document,
                    city: producer.city,
                    UF: producer.UF,
                    ...producer

                }));

                setUserValues(formattedData);
                setSelectProducerValues(formattedData)

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


                setSelectFarmValues(formattedData)

            })
            .catch((error) => {
                console.error("Erro ao carregar lista de produtores:", error);
                message.error("Erro ao carregar produtores.");
            });
    };

    const handleDelete = async (record: any) => {
        try {
            await producerRequest.deleteProducer(record.key);
            message.success(`Produtor ${record.name} excluído com sucesso.`);
            loadProducers();
        } catch (error) {
            console.error("Erro ao excluir produtor:", error);
            message.error("Erro ao excluir o produtor.");
        }
    };

    const handleEdit = async (record:any)=>{
        setIsActiveModalProducer(!isActiveModalProducer)
        setEditProducer(record)
    }

    const columns = [
        {
            title: "Nome do Produtor",
            dataIndex: "name",
            key: "name",
            width: "19%",
           
        },
        {
            title: "CPF/CNPJ",
            dataIndex: "document",
            key: "document",
            width: "12%",
            align: 'center',
        },
        {
            title: "Cidade",
            dataIndex: "city",
            key: "city",
            width: "12%",
            align: 'center',
        },
        {
            title: "UF",
            dataIndex: "UF",
            key: "UF",
            width: "5%",
            align: 'center',
        },
        {
            title: "Ações",
            dataIndex: "action",
            key: "action",
            width: "12%",
            render: (_: any, record: any) => {
                return (
                    <Fragment>
                        <Container>

                            <Item>
                                <IconButton
                                    tooltipTitle="Visualizar Produtor"
                                    isLoadingIcon={false}
                                    iconName="edit"
                                    onClick={() => handleEdit(record)}
                                />
                            </Item>
                            <Item>
                                <IconButton
                                    isLoadingIcon={false}
                                    tooltipTitle="Excluir Produtor"
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
            <ModalHomeProducer  handleRefresh={loadProducers} />
            <ModalHomeAgriculture handleRefresh={loadProducers} selectValues={selectFarmValues} />
            <TableHome selectProducerValues={selectProducerValues}  handleRefresh={loadProducers} columns={columns} dataSource={userValues} />
        </Fragment>
    );
};
