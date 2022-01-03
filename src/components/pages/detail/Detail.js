import { Badge, CircularProgress, Modal, Snackbar } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchApi } from '../../../api/responseApi';
import FeedbackApi from '../../common/snakAlert/FeedbackApi';
import Filters from './Filters';
import { getDatabase, ref, query, orderByChild, child, get, orderByValue } from "firebase/database";

const Detail = () => {
    let params = useParams();
    const [orgData, setOrgData] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [singleData, setSingleData] = useState()
    const [apiSuccess, setApiSuccess] = useState()
    const [filtersList, setFiltersList] = useState()
    const [selectedFilters, setSelectedFilters] = useState({
        sold: true
    })

    const mapData = useMemo(() => (
        data?.map((d, index) => (
            <div className='text-center relative' key={index}>
                <div className="absolute right-20 bottom-[25px]">
                    {d.priceInLovelace < 0 ?
                        <Badge color="info" badgeContent={`Sold`} max={999} /> :
                        <Badge color="info" badgeContent={`${d.priceInLovelace / 1000000}₳`} max={999} />
                    }
                </div>
                <img className='mx-auto h-20 w-20 cursor-pointer' onClick={() => openModal(d)} src={d.url} alt="img" />
                <div className="text-sm">{d.name}</div>
            </div>
        ))
    ), [data])

    useEffect(() => {
        (async () => {
            const res = await fetchApi('pool-info/nft-sections/list')
            setLoading(false)
            console.log(res)
            if (!res.error) {
                let list = res.data
                list = list.filter(li => li.name === params.id)
                const filters = {}

                if (list.length) {
                    list[0].nfts?.forEach(l => {
                        l.variations.forEach(v => {
                            const split = v.split(':')
                            if (filters[split[0]]) {
                                const check = filters[split[0]].filter(f => f === split[1])
                                if (!check.length)
                                    filters[split[0]].push(split[1])
                            } else {
                                filters[split[0]] = [split[1]]
                            }
                        })
                    })
                    setFiltersList(filters)
                    setData(list[0]?.nfts)
                    setOrgData(list[0])
                }
            }
        })()
    }, [])

    const openModal = async (d) => {
        setSingleData(d)
        setOpen(true)
    }

    const getDate = () => {
        if (singleData?.mintedDateMillis) {
            const date = new Date(singleData.mintedDateMillis);
            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        }
    }

    const copyAddress = () => {
        var copyText = document.getElementById("wallet");
        const text = copyText.innerHTML;
        navigator.clipboard.writeText(text);
        setApiSuccess(['Address copied!'])
    }

    const applyFilter = () => {
        const d = [...orgData.nfts].
            filter(f => {
                if ((!selectedFilters.sold) && (f.priceInLovelace < 0)) return null
                f.variations.forEach(v => {
                    const split = v.split(':')
                    selectedFilters[split[0]]?.includes(split[1])
                })

                return f
            }).
            sort(function (obj1, obj2) {
                if (selectedFilters.value === 'up')
                    return obj2.priceInLovelace - obj1.priceInLovelace;
                else if (selectedFilters.value === 'down')
                    return obj1.priceInLovelace - obj2.priceInLovelace;
                return
            })
        console.log('d', d, orgData?.nfts)
        setData([...d])

    }
    console.log('filter', selectedFilters, selectedFilters.sold)

    return (
        <div className="py-20">

            {loading ? <div className="col-span-3 text-center h-full">
                <CircularProgress />
            </div> : <>
                <div className="flex justify-between">
                    <div className="text-xl mb-10 font-bold">{orgData.name}</div>
                    <Filters filtersList={filtersList} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} applyFilter={applyFilter} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-5">
                    {mapData}
                </div>
            </>
            }
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className="w-[95%] md:w-[500px] h-[92%] 2xl:h-[70%]  overflow-auto absolute rltb-0 m-rltb-auto bg-white rounded-lg p-10" >
                    <div className="text-right">{getDate()}</div>
                    <div className="text-center">
                        <img src={singleData?.url} className='w-[40%] m-auto' alt="img" />
                        <div className="text-lg">{singleData?.name} {singleData?.priceInLovelace > 0 && `(${singleData?.priceInLovelace / 1000000}₳)`}</div>
                        {singleData?.priceInLovelace < 0 ?
                            <Badge color="info" badgeContent={`Sold`} sx={{ '.MuiBadge-badge': { fontSize: '16px', padding: '10px 12px' } }} className="text-lg" max={999} />
                            : <>
                                <div className="text-sm text-left mt-5">Wallet address</div>
                                <div className="grid grid-cols-12 gap-3">
                                    <div id="wallet" className="text-base break-words col-span-11 text-gray-600">
                                        {singleData?.paymentWallet}
                                    </div>
                                    <div className="cursor-pointer col-span-1" onClick={copyAddress}>Copy</div>
                                </div>
                            </>
                        }
                        <div className="mt-10">
                            <ul className="list-none">
                                {
                                    singleData?.variations.map((v, index) => (
                                        <li key={index} className='grid grid-cols-2 text-left'>
                                            <div className='font-medium'>{v.split(':')[0]}</div>
                                            <div className='text-right'>{v.split(':')[1]}</div>
                                        </li>
                                    ))
                                }
                            </ul>

                        </div>
                    </div>
                </div>
            </Modal>
            <FeedbackApi apiSuccess={apiSuccess} setApiSuccess={setApiSuccess} />
        </div>
    )
}

export default Detail
