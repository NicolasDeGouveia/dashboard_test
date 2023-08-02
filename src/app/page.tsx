import Image from 'next/image';
import Header from './components/Header';
import Charts from './components/charts/Charts';

export default function Home() {
    return (
        <>
            <Header />

            <Charts />
        </>
    );
}
