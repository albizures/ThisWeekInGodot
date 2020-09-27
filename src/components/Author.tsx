import { AuthorContent } from '../lib/authors';

type Props = {
	author: AuthorContent;
};
export default function Author({ author }: Props) {
	return <span className="text-gray-600 inline-block ml-2">{author.name}</span>;
}
