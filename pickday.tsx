import { useEffect, useRef, useCallback } from 'react';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';

interface UsePikadayOptions {
    minDate?: Date;
    maxDate?: Date;
    disableWeekends?: boolean;
    firstDay?: number;
    onSelect?: (date: Date) => void;
}

export const usePikaday = (options: UsePikadayOptions = {}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const pickerInstance = useRef<Pikaday | null>(null);
    
    const {
        minDate = new Date(),
        maxDate = new Date(2020, 11, 31),
        disableWeekends = true,
        firstDay = 1,
        onSelect
    } = options;
    
    useEffect(() => {
        if (!inputRef.current) return;
        
        pickerInstance.current = new Pikaday({
            field: inputRef.current,
            minDate,
            maxDate,
            disableWeekends,
            firstDay,
            onSelect: function(this: Pikaday) {
                const date = this.getDate();
                onSelect?.(date);
            }
        });
        
        return () => {
            pickerInstance.current?.destroy();
        };
    }, [minDate, maxDate, disableWeekends, firstDay, onSelect]);
    
    const updateEndDate = useCallback((date: Date): void => {
        console.log('End date updated:', date);
        // 你的更新逻辑
    }, []);
    
    return { inputRef, pickerInstance, updateEndDate };
};

// 使用 Hook 的组件
const EndDatePicker: React.FC = () => {
    const { inputRef, updateEndDate } = usePikaday({
        minDate: new Date(),
        maxDate: new Date(2020, 11, 31),
        disableWeekends: true,
        firstDay: 1,
        onSelect: (date: Date) => {
            updateEndDate(date);
            // 其他处理逻辑
        }
    });
    
    return (
        <div>
            <label htmlFor="end">结束日期：</label>
            <input
                ref={inputRef}
                id="end"
                type="text"
                className="form-control"
                placeholder="选择日期"
            />
        </div>
    );
};
