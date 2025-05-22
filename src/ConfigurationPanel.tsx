import React, { useState } from 'react';
import {
  Box,
  Switch,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  TextField,
  Button,
  Stack,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const retailersList = ['Walmart', 'Target', 'Best Buy', 'JC Penny', 'Nordstrom'];

const ConfigurationPanel: React.FC = () => {
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [productType, setProductType] = useState('KERV Kart');
  const [isMultiRetailer, setIsMultiRetailer] = useState(false);
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>([]);
  const [showProductRetailerLogo, setShowProductRetailerLogo] = useState(true);
  const [retailerFormControlKey, setRetailerFormControlKey] = useState(0);

  const handleEcommerceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEcommerce(event.target.checked);
    if (!event.target.checked) {
      setIsMultiRetailer(false);
      setSelectedRetailers([]);
      setRetailerFormControlKey(prevKey => prevKey + 1);
    }
  };

  const handleProductTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductType((event.target as HTMLInputElement).value);
  };

  const handleMultiRetailerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsMultiRetailer(checked);
    if (!checked && selectedRetailers.length > 1) {
      setSelectedRetailers([selectedRetailers[0]]);
    } else if (!checked && selectedRetailers.length === 0 && retailersList.length > 0){
        // If switching to single and was empty, can leave empty or default, let's leave empty
        // setSelectedRetailers([retailersList[0]]); 
    } else if (checked && selectedRetailers.length === 0 && retailersList.length > 0) {
        // If switching to multi and was empty, can leave empty or default to first retailer
        // setSelectedRetailers([retailersList[0]]);
    }
  };

  const handleRetailerChange = (event: SelectChangeEvent<string | string[]>) => {
    const value = event.target.value;
    if (isMultiRetailer) {
      const newSelectedRetailers = typeof value === 'object' ? value as string[] : [];
      if (newSelectedRetailers.length <= 3) {
        setSelectedRetailers(newSelectedRetailers);
      }
    } else {
      setSelectedRetailers(typeof value === 'string' && value ? [value] : []);
    }
  };
  
  const handleDeleteRetailer = (retailerToDelete: string) => () => {
    const nextSelectedRetailers = selectedRetailers.filter(chip => chip !== retailerToDelete);
    setSelectedRetailers(nextSelectedRetailers);

    if (!isMultiRetailer || (isMultiRetailer && nextSelectedRetailers.length === 0)) {
      setRetailerFormControlKey(prevKey => prevKey + 1);
    }
  };

  const selectValue = isMultiRetailer ? selectedRetailers : (selectedRetailers[0] || '');

  return (
    <Box sx={{ width: 515, p: 2, backgroundColor: 'background.default', color: 'text.primary' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Configuration</Typography>

      <Accordion defaultExpanded sx={{ backgroundColor: 'background.paper', mb: 1}} >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />} 
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            paddingLeft: '24px'
          }}
        >
          <FormControlLabel
            control={<Switch checked={isEcommerce} onChange={handleEcommerceChange} />}
            label="eCommerce"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
          />
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor: 'background.default'}}>
          {isEcommerce && (
            <Stack spacing={2}>
              <Box>
                <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>Product Type</Typography>
                <RadioGroup row value={productType} onChange={handleProductTypeChange}>
                  <FormControlLabel value="KERV Kart" control={<Radio />} label="KERV Kart" />
                  <FormControlLabel value="KERV Kart +" control={<Radio />} label="KERV Kart +" />
                  <FormControlLabel value="GWS" control={<Radio />} label="GWS" />
                </RadioGroup>
              </Box>

              <FormControl fullWidth key={retailerFormControlKey}>
                <InputLabel 
                  id="retailer-select-label" 
                  sx={{color: 'text.secondary'}} 
                >
                  Retailer
                </InputLabel>
                <Select<string | string[]>
                  labelId="retailer-select-label"
                  multiple={isMultiRetailer}
                  value={selectValue}
                  onChange={handleRetailerChange}
                  input={<OutlinedInput label="Retailer" />}
                  renderValue={(selectedValue) => {
                    const itemsToRender = typeof selectedValue === 'string' ? (selectedValue ? [selectedValue] : []) : selectedValue;
                    if (!isMultiRetailer && itemsToRender.length === 0) {
                      return null;
                    }
                    if (isMultiRetailer && itemsToRender.length === 0) {
                        return null;
                    }
                    return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}>
                        {itemsToRender.map((name) => (
                            <Chip 
                                key={name} 
                                label={name}
                                onDelete={handleDeleteRetailer(name)}
                                sx={{ 
                                    '& .MuiChip-deleteIcon': {
                                        display: 'inline-flex',
                                    }
                                }}
                                onMouseDown={(event) => {
                                    event.stopPropagation();
                                }}
                            />
                        ))}
                        </Box>
                    );
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 224, 
                      },
                    },
                  }}
                >
                  {retailersList.map((retailer) => (
                    <MenuItem key={retailer} value={retailer}>
                      {retailer}
                    </MenuItem>
                  ))}
                </Select>
                {isMultiRetailer && 
                  <FormHelperText sx={{color: 'text.secondary', ml: '14px'}}>
                    Select Up to 3
                  </FormHelperText>
                }
              </FormControl>

              <FormControlLabel
                control={<Switch checked={isMultiRetailer} onChange={handleMultiRetailerChange} />}
                label="Multi-Retailer"
              />

              <FormControlLabel
                control={<Switch checked={showProductRetailerLogo} onChange={(e) => setShowProductRetailerLogo(e.target.checked)} />}
                label="Show product retailer logo"
              />
            </Stack>
          )}
        </AccordionDetails>
      </Accordion>

      <Box sx={{ my: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>Auto Update</Typography>
        <TextField
            fullWidth
            disabled
            value="88 DAYS LEFT"
            variant="outlined"
        />
      </Box>

      {['Brand', 'PCTA', 'Layout'].map((item) => (
        <Accordion key={item} sx={{ color: 'text.primary'}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{item}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{color: 'text.secondary'}}>
              Details for {item} will go here.
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ConfigurationPanel; 