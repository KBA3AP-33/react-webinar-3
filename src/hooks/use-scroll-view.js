import { useRef } from 'react';

export default function useScrollView() {
    const defaultParams = { behavior: 'smooth', block: 'center', inline: 'center' };
    const ref = useRef(null);
    const view = (params) => ref.current?.scrollIntoView({ ...defaultParams, ...params });

    return { ref, view };
}
