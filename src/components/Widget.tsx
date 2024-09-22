import { useCallback, useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import { lighten } from "@mui/material/styles";

import { fetchWidgetState } from "../services/widget-service";
import { WidgetState } from "../types/WidgetTypes";
import Skeleton from "@mui/material/Skeleton/Skeleton";

import './widget.css';

const BrightnessLevel = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#fff',
    border: '1px solid #fff',
    borderRadius: '4px',
    fontSize: 26,
}));

const PowerBar = styled('div', { 
    shouldForwardProp: (prop) => prop !== 'item' && prop !== 'length',
})<{ item: number; length: number }>(({ item, length }) => ({
    flexBasis: '100%',
    backgroundColor: lighten('rgb(117, 212, 232)', (((100 / length) * (item + 1)) / 100)),
    width: 0,
    height: '10px',
}))

const Widget = () => {
    const increment = 20;
    const [state, setState] = useState<WidgetState>({
        brightness: 0,
        timeLeft: 0,
        nightVision: false,
        duskTillDawn: false,
        flashing: false,
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [, setError] = useState<Error | null>(null);

    const fetchWidgetData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchWidgetState();
            setState(response)
        } catch (err: unknown) {
            const error = err as Error;
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWidgetData();
    }, [fetchWidgetData])

    const changeNightVision = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, nightVision: event.target.checked}));
    };

    const changeDuskTillDawn = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, duskTillDawn: event.target.checked}));
    };

    const changeFlashing = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, flashing: event.target.checked}));
    };

    return (
    <Box sx={{ flexGrow: 1, p: 2, bgcolor: 'rgb(7, 30, 58)', borderRadius: 1, color: '#fff' }}>
        <Grid container spacing={1}>
            <Grid size={12}>
                <div style={{width: '100%'}}>
                    <Grid container spacing={1}>
                        <Grid size={4}>
                            <h1 className="widget-name">THR 08</h1>
                        </Grid>

                        <Grid size={8}>
                            { loading ? <Skeleton variant="rounded" width={'100%'} height={5} /> :
                            <Box component="div" sx={{
                                display: 'flex',
                                gap: '0.5rem',
                                width: '100%',
                            }}>
                                { Array.from({ length: 5 }, (_value, index) => index).map((item, index, arr) => <PowerBar item={item} length={arr.length} key={index} />) }
                            </Box> }
                        </Grid>
                    </Grid>
                </div>
            </Grid>

            <Grid size={4}>
                <Stack direction="column" spacing={0.5}>
                    <Button 
                        onClick={() => setState((prev) => ({
                            ...prev,
                            brightness: prev.brightness <= (100 - increment) ? prev.brightness + increment : prev.brightness,
                        }))}
                        disabled={state.brightness === 100 || loading}
                        variant="contained"
                        name="plus"
                    >
                        <AddIcon sx={{ fontSize: 40 }} />
                    </Button>

                    { loading ? 
                        <Skeleton variant="rounded" width={'100%'} height={55} sx={{  border: '1px solid #fff', borderRadius: '4px',}} /> 
                        : 
                        <BrightnessLevel>{ state.brightness }%</BrightnessLevel>
                    }

                    <Button 
                        onClick={() => setState((prev) => ({
                            ...prev,
                            brightness: prev.brightness >= (0 + increment) ? prev.brightness - increment : prev.brightness,
                        }))}
                        disabled={state.brightness === 0 || loading }
                        variant="contained"
                        name="minus"
                    >
                        <RemoveIcon sx={{ fontSize: 40 }} />
                    </Button>
                </Stack>
                
            </Grid>

            { loading ? <Grid size={8}>
                <Skeleton variant="rounded" width={'100%'} height={62} />
                <Skeleton variant="rounded" width={'100%'} height={114} />
            </Grid> :
    
            <Grid size={8}>
                <Box component={'div'} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    p: 2,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgb(12, 45, 87)',
                    borderRadius: 1,
                    fontSize: '0.75rem',
                }}>
                    <BatteryChargingFullIcon />
                    Time left
                    <Box component={'span'} sx={{ marginLeft: 'auto', fontSize: '1.25rem', fontWeight: 500 }}>{state.timeLeft}h</Box>
                </Box>
    
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                    <FormGroup aria-label="position">
                        <FormControlLabel
                            value="nightVision"
                            control={<Switch
                                checked={state.nightVision}
                                onChange={changeNightVision}
                                inputProps={{ 'aria-label': 'controlled' }}
                                sx={{ marginLeft: 'auto' }}
                            />}
                            label="Night Vision"
                            labelPlacement="start"
                        />

                        <FormControlLabel
                            value="duskTillDawn"
                            control={<Switch
                                checked={state.duskTillDawn}
                                onChange={changeDuskTillDawn}
                                inputProps={{ 'aria-label': 'controlled' }}
                                sx={{ marginLeft: 'auto' }}
                            />}
                            label="Dusk Till Dawn"
                            labelPlacement="start"
                        />

                        <FormControlLabel
                            value="flashing"
                            control={<Switch
                                checked={state.flashing}
                                onChange={changeFlashing}
                                inputProps={{ 'aria-label': 'controlled' }}
                                sx={{ marginLeft: 'auto' }}
                            />}
                            label="Flashing"
                            labelPlacement="start"
                        />
                    </FormGroup>
                </FormControl>
            </Grid> }
        </Grid>
    </Box>
    );

};

export default Widget;
