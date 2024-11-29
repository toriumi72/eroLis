import { createClient } from "@/utils/supabase/server";
import Link from 'next/link'

export default async function Index() {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from('categories')
    .select(`
      *,
      adultsitecategories (
        adult_site_id,
        adultsites (*)
      )
    `);
  
  return (
    <>
      <main className="w-full gap-6 px-4">
        {error && <p>カテゴリの取得に失敗しました。</p>}
        {categories && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categories.map(category => (
              <div key={category.id} className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">🤩{category.name}</h2>
                <ul>
                  {category.adultsitecategories.map(as => (
                    <li key={as.adult_site_id} className="mb-2">
                      <Link href={as.adultsites.url} target="_blank">
                        {as.adultsites.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
