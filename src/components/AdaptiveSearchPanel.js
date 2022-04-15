import { Button, Collapse, InputAdornment, MenuItem, Select, TextField } from "@material-ui/core"
import { useState } from "react"
import SearchIcon from '@mui/icons-material/Search'
import { red } from '@mui/material/colors'
import { useTheme } from "@material-ui/styles"
import './AdaptiveSearchPanel.css'

export default function ({
    hide = false,
    searchInputLabel = "search",
    QRCode = "https://demo.curlythemes.com/qr/wp-content/plugins/simple-qr/qr-generator.php?size=160&type=url&url=demo.curlythemes.com/qr",
    selectTermLabel,
    selectMonthLabel,
    selectPublisherLabel,
    selectTermItemList = ['test1', 'test2'],
    selectMonthItemList = ['mtest1', 'mtest2'],
    selectPublisherItemList = ['ptest1', 'ptest2'],
    searchTip = "this is search tip",
    showADSTip = "Show More Filters",
    hideADSTip = "Hide Filters",
    onSearch = ({ searchContent, searchTerm, searchMonth, searchPublisher }) => console.log(searchContent, searchTerm, searchMonth, searchPublisher)

}) {


    const theme = useTheme();


    const [searchInput, setSearchInput] = useState("")
    const [selectTerm, setSelectTerm] = useState("")
    const [selectMonth, setSelectMonth] = useState("")
    const [selectPublisher, setSelectPublisher] = useState("")

    const [showADS, setShowADS] = useState(false);

    const handleSearch = () => {
        onSearch({
            searchContent: searchInput,
            searchTerm: selectTerm,
            searchMonth: selectMonth,
            searchPublisher: selectPublisher
        })
    }

    const onPressEnter = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const SearchBox = (
        <TextField variant="outlined"
            color="primary"
            style={{
                width: '100%',
                padding: '0'
            }}
            sx={{
                padding: '0'
            }}
            focused
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: theme.palette.primary.main, cursor: 'pointer' }}
                            onClick={handleSearch} />
                    </InputAdornment>
                )
            }}
            label={searchInputLabel}
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={onPressEnter} />
    )

    const AdvanceSearch = (
        <div style={{
            width: '100%',
            display: "flex"
        }}>
            {
                hide ?
                    <></>
                    :
                    <div id="ads-qrcode">
                        <img src={QRCode} alt="QRCode Here" />
                    </div>
            }

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
            }}>
                <div style={{
                    width: '100%',
                    display: 'flex'
                }}>
                    <Select value={selectTerm}
                        label={selectTermLabel}
                        onChange={e => setSelectTerm(e.target.value)}
                        style={{
                            flex: 1
                        }}
                        onKeyDown={onPressEnter}
                    >
                        {
                            selectTermItemList.map((e) => <MenuItem value={e}>{e}</MenuItem>)
                        }
                    </Select>
                    <Select value={selectMonth}
                        label={selectMonthLabel}
                        onChange={e => setSelectMonth(e.target.value)}
                        style={{
                            flex: 1
                        }}
                        onKeyDown={onPressEnter}
                    >
                        {
                            selectMonthItemList.map((e) => <MenuItem value={e}>{e}</MenuItem>)
                        }
                    </Select>
                </div>
                <Select value={selectPublisher}
                    label={selectPublisherLabel}
                    onChange={e => setSelectPublisher(e.target.value)}
                    onKeyDown={onPressEnter}
                >
                    {
                        selectPublisherItemList.map((e) => <MenuItem value={e}>{e}</MenuItem>)
                    }
                </Select>
                <div id="search-tip">{searchTip}</div>
            </div>
        </div>
    )

    return hide ?
        <div id="adaptive_search_panel">
            {SearchBox}
            <div style={{
                // color: theme.palette.primary.main,
                width: '100%',
                textAlign: 'right'
            }}>
                <Button onClick={() => setShowADS(pre => !pre)}
                    size="small"
                    color="primary"
                >{showADS ? hideADSTip : showADSTip}</Button>
            </div>

            <Collapse in={showADS}>
                {AdvanceSearch}
            </Collapse>
        </div>
        :
        <div id="adaptive_search_panel">
            {SearchBox}
            {AdvanceSearch}
        </div>
}