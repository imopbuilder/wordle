import { Board, Keyboard, RevealWord } from '@/components/pages/home/client';

export default function Home() {
	return (
		<main>
			<section>
				<div className='max-w-maxi mx-auto py-5'>
					<div className='grid grid-cols-[repeat(5,_60px] gap-3 w-max mx-auto'>
						<Board />
					</div>
				</div>
			</section>
			<section>
				<div className='max-w-maxi mx-auto'>
					<div className='max-w-maxi mx-auto'>
						<RevealWord />
					</div>
				</div>
			</section>
			<section>
				<div className='max-w-3xl mx-auto py-5'>
					<div className='grid grid-cols-[repeat(auto-fit,_minmax(60px,_1fr))] gap-3'>
						<Keyboard />
					</div>
				</div>
			</section>
		</main>
	);
}
