import { useState, useEffect, useRef } from 'react';

type ButtonState = 'default' | 'hover' | 'walking1' | 'walking2' | 'falling1' | 'falling2' | 'falling3';

const logoutButtonStates: Record<ButtonState, Record<string, string>> = {
  'default': {
    '--figure-duration': '100',
    '--transform-figure': 'none',
    '--walking-duration': '100',
    '--transform-arm1': 'none',
    '--transform-wrist1': 'none',
    '--transform-arm2': 'none',
    '--transform-wrist2': 'none',
    '--transform-leg1': 'none',
    '--transform-calf1': 'none',
    '--transform-leg2': 'none',
    '--transform-calf2': 'none'
  },
  'hover': {
    '--figure-duration': '100',
    '--transform-figure': 'translateX(1.5px)',
    '--walking-duration': '100',
    '--transform-arm1': 'rotate(-5deg)',
    '--transform-wrist1': 'rotate(-15deg)',
    '--transform-arm2': 'rotate(5deg)',
    '--transform-wrist2': 'rotate(6deg)',
    '--transform-leg1': 'rotate(-10deg)',
    '--transform-calf1': 'rotate(5deg)',
    '--transform-leg2': 'rotate(20deg)',
    '--transform-calf2': 'rotate(-20deg)'
  },
  'walking1': {
    '--figure-duration': '300',
    '--transform-figure': 'translateX(11px)',
    '--walking-duration': '300',
    '--transform-arm1': 'translateX(-4px) translateY(-2px) rotate(120deg)',
    '--transform-wrist1': 'rotate(-5deg)',
    '--transform-arm2': 'translateX(4px) rotate(-110deg)',
    '--transform-wrist2': 'rotate(-5deg)',
    '--transform-leg1': 'translateX(-3px) rotate(80deg)',
    '--transform-calf1': 'rotate(-30deg)',
    '--transform-leg2': 'translateX(4px) rotate(-60deg)',
    '--transform-calf2': 'rotate(20deg)'
  },
  'walking2': {
    '--figure-duration': '400',
    '--transform-figure': 'translateX(17px)',
    '--walking-duration': '300',
    '--transform-arm1': 'rotate(60deg)',
    '--transform-wrist1': 'rotate(-15deg)',
    '--transform-arm2': 'rotate(-45deg)',
    '--transform-wrist2': 'rotate(6deg)',
    '--transform-leg1': 'rotate(-5deg)',
    '--transform-calf1': 'rotate(10deg)',
    '--transform-leg2': 'rotate(10deg)',
    '--transform-calf2': 'rotate(-20deg)'
  },
  'falling1': {
    '--figure-duration': '1600',
    '--walking-duration': '400',
    '--transform-arm1': 'rotate(-60deg)',
    '--transform-wrist1': 'none',
    '--transform-arm2': 'rotate(30deg)',
    '--transform-wrist2': 'rotate(120deg)',
    '--transform-leg1': 'rotate(-30deg)',
    '--transform-calf1': 'rotate(-20deg)',
    '--transform-leg2': 'rotate(20deg)'
  },
  'falling2': {
    '--walking-duration': '300',
    '--transform-arm1': 'rotate(-100deg)',
    '--transform-arm2': 'rotate(-60deg)',
    '--transform-wrist2': 'rotate(60deg)',
    '--transform-leg1': 'rotate(80deg)',
    '--transform-calf1': 'rotate(20deg)',
    '--transform-leg2': 'rotate(-60deg)'
  },
  'falling3': {
    '--walking-duration': '500',
    '--transform-arm1': 'rotate(-30deg)',
    '--transform-wrist1': 'rotate(40deg)',
    '--transform-arm2': 'rotate(50deg)',
    '--transform-wrist2': 'none',
    '--transform-leg1': 'rotate(-30deg)',
    '--transform-leg2': 'rotate(20deg)',
    '--transform-calf2': 'none'
  }
};

export const useLogoutAnimation = () => {
  const [buttonState, setButtonState] = useState<ButtonState>('default');
  const [buttonClasses, setButtonClasses] = useState<string>('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateButtonState = (state: ButtonState) => {
    setButtonState(state);
    if (buttonRef.current) {
      for (const [key, value] of Object.entries(logoutButtonStates[state])) {
        buttonRef.current.style.setProperty(key, value);
      }
    }
  };

  const handleMouseEnter = () => {
    if (buttonState === 'default') {
      updateButtonState('hover');
    }
  };

  const handleMouseLeave = () => {
    if (buttonState === 'hover') {
      updateButtonState('default');
    }
  };

  const handleClick = () => {
    if (buttonState === 'default' || buttonState === 'hover') {
      setButtonClasses('clicked');
      updateButtonState('walking1');
      
      const walking1Duration = parseInt(logoutButtonStates['walking1']['--figure-duration']);
      setTimeout(() => {
        setButtonClasses('clicked door-slammed');
        updateButtonState('walking2');
        
        const walking2Duration = parseInt(logoutButtonStates['walking2']['--figure-duration']);
        setTimeout(() => {
          setButtonClasses('clicked door-slammed falling');
          updateButtonState('falling1');
          
          const falling1Duration = parseInt(logoutButtonStates['falling1']['--walking-duration']);
          setTimeout(() => {
            updateButtonState('falling2');
            
            const falling2Duration = parseInt(logoutButtonStates['falling2']['--walking-duration']);
            setTimeout(() => {
              updateButtonState('falling3');
              setTimeout(() => {
                setButtonClasses('');
                updateButtonState('default');
              }, 1000);
            }, falling2Duration);
          }, falling1Duration);
        }, walking2Duration);
      }, walking1Duration);
    }
  };

  return {
    buttonRef,
    buttonClasses,
    handleMouseEnter,
    handleMouseLeave,
    handleClick
  };
};
export default useLogoutAnimation;