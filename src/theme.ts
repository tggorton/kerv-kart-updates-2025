import { createTheme, Theme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EF0078',
    },
    background: {
      default: '#1E1E1E', // Changed: Main panel background to #1E1E1E
      paper: '#1E1E1E',   // Accordion/paper background remains #1E1E1E
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0', // For less prominent text
    },
    action: {
      active: '#EF0078', // Color for active elements like switch thumbs
      hover: 'rgba(239, 0, 120, 0.08)', // Hover color for interactive elements
      selected: 'rgba(239, 0, 120, 0.16)', // Selected color
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0', // Used for OFF thumb
      400: '#bdbdbd',
      500: '#9e9e9e', // Used for OFF track
      600: '#757575',
      700: '#616161', // Used for disabled track
      800: '#424242',
      900: '#212121',
      A100: '#A1A1A1', // Used for OFF switch thumb
      A200: 'rgba(161, 161, 161, 0.7)', // Used for OFF switch track
      A400: '#303030',
      A700: '#616161',
    }
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif', // Matching typical MUI font stack
    h6: {
        fontWeight: 500,
        fontSize: '1.0rem', // Increased for "Configuration" title
    },
    body1: {
        fontSize: '0.8rem', // Smaller body text
    },
    body2: {
        fontSize: '0.75rem', // Smaller secondary text
    },
    button: {
        textTransform: 'none', // Kerv buttons often don't use all caps
        fontWeight: 500,
        fontSize: '0.75rem', // Slightly reduced Save button text
    },
    caption: {
        fontSize: '0.7rem', // Smaller caption for "Select up to 3"
    }
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 44,      // Thumb (24px) + Travel (16px) + Margins (4px)
          height: 28,     // To contain 24px thumb
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          // Removed marginRight here, will be handled by FormControlLabel or AccordionSummary padding
        },
        switchBase: ({ theme: currentTheme }: { theme: Theme }) => ({
          padding: 0,
          margin: `${(28 - 24) / 2}px`, // Center 24px thumb in 28px height, minimal horizontal for edge alignment
          transition: currentTheme.transitions.create(['transform'], {
            duration: currentTheme.transitions.duration.shortest,
          }),
          '&.Mui-checked': {
            transform: 'translateX(16px)', // Travel distance for smaller switch
            color: '#fff', 
            '& + .MuiSwitch-track': {
              backgroundColor: 'rgba(239, 0, 120, 0.5)',
              opacity: 1,
              border: 'none',
            },
            '& .MuiSwitch-thumb': {
              backgroundColor: '#EF0078',
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            boxShadow: `0 0 0 3px rgba(239, 0, 120, 0.3)`,
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            backgroundColor: currentTheme.palette.grey[400],
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            backgroundColor: currentTheme.palette.grey[700],
          },
        }),
        thumb: ({ theme: currentTheme }: { theme: Theme }) => ({
          boxSizing: 'border-box',
          width: 24, // Smaller thumb
          height: 24, // Smaller thumb
          backgroundColor: currentTheme.palette.grey.A100, // #A1A1A1 for OFF thumb
          boxShadow: currentTheme.shadows[1],
        }),
        track: ({ theme: currentTheme }: { theme: Theme }) => ({
          borderRadius: 8, // height / 2
          width: 'calc(100% - 4px)', // Ensure track is slightly inset if switchBase has horizontal margin for alignment
          height: 16,    // Smaller track
          backgroundColor: currentTheme.palette.grey.A200, // rgba(161, 161, 161, 0.7) for OFF track
          opacity: 1,
          marginLeft: '2px', // Adjust track position relative to thumb start
          marginRight: '2px',
          transition: currentTheme.transitions.create(['background-color', 'border'], {
            duration: currentTheme.transitions.duration.shortest,
          }),
        }),
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#B0B0B0', // Default radio color (outer ring)
          padding: '4px', // Further reduced padding
          '&.Mui-checked': {
            color: '#EF0078', // Pink for checked state (ring and dot)
          },
          // Attempt to style the inner dot for non-checked state if possible, though usually controlled by icon.
          // For a ring + dot effect on checked, MUI often uses a specific icon.
          // If we want a pink ring and pink center for checked, the above color: '#EF0078' is fine.
          // If we need an outlined ring and a smaller center dot for checked (like figma):
          // This would typically require replacing the icon for MuiRadio.
          // For now, we make sure the checked state is pink.
        },
        // Removed empty 'checked: {}' that might have caused a linter warning if it was just empty.
      },
    },
    MuiFormControlLabel: {
        styleOverrides: {
            label: {
                fontSize: '0.8rem', 
                marginLeft: '8px', // Increased margin for switch labels
            }
        }
    },
    MuiAccordion: {
        styleOverrides: {
            root: ({
              theme: currentTheme // Make theme available for border color
            }: { theme: Theme }) => ({
              backgroundColor: currentTheme.palette.background.paper, // Now #1E1E1E
              color: currentTheme.palette.text.primary,
              boxShadow: 'none',
              minHeight: 'auto',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)', // Changed: Hairline separator using new color
              marginBottom: 0, // Remove margin to stack them with only border separator
              '&:before': {
                display: 'none',
              },
              '&.Mui-expanded': {
                margin: 0, // No margin when expanded either
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)', // Keep hairline when expanded
              },
              '&:last-of-type': {
                borderBottom: 'none', // No border for the last accordion in a group
              },
            })
        }
    },
    MuiAccordionSummary: {
        styleOverrides: {
            root: {
                minHeight: '36px',
                padding: '0 16px',
                backgroundColor: 'transparent', // Make summary transparent to show accordion root bg
                '&.Mui-expanded': {
                    minHeight: '36px',
                },
            },
            content: {
                margin: '6px 0',
                '&.Mui-expanded': {
                    margin: '6px 0',
                },
            },
            expandIconWrapper: {
                color: '#FFFFFF',
                right: '8px',
            }
        }
    },
    MuiAccordionDetails: {
        styleOverrides: {
            root: {
                 // For Brand/PCTA/Layout, details bg should also be #2E2E2E
                 // For eCommerce, it's specifically overridden to #1E1E1E in ConfigurationPanel.tsx
                padding: '4px 16px 8px 16px', // Tighter padding, but keep left/right for content alignment
                backgroundColor: 'transparent', // Make details transparent to show accordion root bg
            }
        }
    },
    MuiSelect: {
        styleOverrides: {
            root: {
                backgroundColor: '#3A3A3A',
                color: '#FFFFFF',
                borderRadius: 4,
                // Using :where for zero specificity for the default icon color
                '&:where(:not(.Mui-focused)) .MuiSelect-iconStandard, &:where(:not(.Mui-focused)) .MuiSelect-icon, &:where(:not(.Mui-focused)) .MuiNativeSelect-icon': {
                    fill: '#B0B0B0', 
                },
                '&.Mui-focused .MuiSelect-iconStandard, &.Mui-focused .MuiSelect-icon, &.Mui-focused .MuiNativeSelect-icon': {
                    fill: '#EF0078 !important',
                },
                '&:hover:not(.Mui-focused) .MuiSelect-iconStandard, &:hover:not(.Mui-focused) .MuiSelect-icon, &:hover:not(.Mui-focused) .MuiNativeSelect-icon': {
                    fill: '#FFFFFF !important',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555555',
                },
                '&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#777777',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#EF0078',
                },
                '& .MuiSelect-select': {
                    padding: '8px 10px',
                    minHeight: 'auto',
                    height: '1.2em',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '4px'
                },
            }
        }
    },
    MuiMenuItem: {
        styleOverrides: {
            root: {
                minHeight: 'auto',
                paddingTop: '6px', 
                paddingBottom: '6px',
                fontSize: '0.8rem',
                '&.Mui-selected': {
                    backgroundColor: 'rgba(239, 0, 120, 0.16)',
                },
                 '&:hover': {
                    backgroundColor: 'rgba(239, 0, 120, 0.08)',
                }
            }
        }
    },
    MuiChip: {
        styleOverrides: {
            root: {
                backgroundColor: '#555555',
                color: '#FFFFFF',
                margin: '1px 2px',
                height: '22px',
                fontSize: '0.7rem',
                '& .MuiChip-deleteIcon': {
                    color: '#B0B0B0',
                    fontSize: '0.8rem',
                    '&:hover': {
                        color: '#FFFFFF',
                    }
                }
            }
        }
    },
    MuiButton: {
      styleOverrides: {
        root: { 
          padding: '4px 10px',
          // fontSize will be inherited from typography.button
        },
        containedPrimary: {
          backgroundColor: '#EF0078',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#D0006A',
          },
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundColor: '#1E1E1E', // Changed: ensure MuiPaper defaults to new paper color
                color: '#FFFFFF',
            }
        }
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                 '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555555',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#777777',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#EF0078',
                },
                fontSize: '0.8rem', // General input font size
                '& input': {
                    color: '#FFFFFF',
                    padding: '8px 10px', // Reduced padding for general inputs
                },
                '& label': {
                    color: '#B0B0B0',
                    fontSize: '0.8rem', // Ensure label matches input font size
                },
                '& label.Mui-focused': {
                    color: '#EF0078',
                },
            },
        },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    minHeight: '36px',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    // fontSize for the root here might be too broad, let input itself handle it.
                    backgroundColor: 'transparent',
                    '& fieldset': {
                        borderColor: '#4A4A4A',
                    },
                    '&:hover fieldset': {
                        borderColor: '#666666',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#EF0078',
                    },
                    '&.Mui-disabled': {
                        backgroundColor: 'transparent',
                    },
                    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4A4A4A',
                    },
                },
                '& .MuiInputBase-input': {
                    textAlign: 'center',
                    padding: '6px 10px',
                    fontSize: '0.75rem', // Reduced for "88 DAYS LEFT"
                },
                '& .MuiInputBase-input.Mui-disabled': {
                    '-webkit-text-fill-color': '#B0B0B0',
                    textAlign: 'center',
                },
            }
        }
    }
  },
});

export default theme; 