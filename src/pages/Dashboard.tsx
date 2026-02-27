import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { MainContent } from "@/components/layout/MainContent";
import { FormCreate } from "@/pages/FormCreate";
import { getStoredForms, deleteForm } from "@/lib/storage";

export function Dashboard() {
  const [forms, setForms] = useState(() => getStoredForms());

  function handleDelete(id: string, name: string) {
    Swal.fire({
      title: "حذف فرم",
      text: `آیا از حذف فرم «${name}» اطمینان دارید؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف شود",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteForm(id);
        setForms(getStoredForms());
      }
    });
  }

  return (
    <MainContent>
      <h1 className="mb-4 text-2xl font-bold">داشبورد</h1>
      <p className="mb-6 text-muted-foreground">
        به فرم‌بیلدر خوش آمدید. از منوی کنار می‌توانید فرم‌های خود را مدیریت
        کنید.
      </p>

      {forms.length === 0 ? (
        <p className="rounded-lg border border-dashed bg-card p-8 text-center text-muted-foreground">
          هنوز فرمی ذخیره نشده. از منو «ساخت فرم جدید» را انتخاب کنید.
        </p>
      ) : (
        <ul className="grid gap-4 list-none p-0 m-0 sm:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <li key={form.id}>
              <article className="rounded-lg border bg-card p-4 h-full flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="text-lg font-semibold flex-1 min-w-0 truncate">
                    {form.name}
                  </h2>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link
                      to={`/forms/${form.id}/edit`}
                      className="p-1.5 rounded text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label="ویرایش فرم"
                    >
                      <PencilSquareIcon className="size-5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(form.id, form.name)}
                      className="p-1.5 rounded text-muted-foreground hover:bg-muted hover:text-red-600"
                      aria-label="حذف فرم"
                    >
                      <TrashIcon className="size-5" />
                    </button>
                  </div>
                </div>
                {form.description ? (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                    {form.description}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground mb-3 flex-1">
                    بدون توضیحات
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-auto">
                  تعداد فیلدها: {form.fields.length}
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10">
        <FormCreate onSaved={() => setForms(getStoredForms())} />
      </div>
    </MainContent>
  );
}
