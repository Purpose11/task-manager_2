import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import { TasksContext } from "../Context/TaskContext";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export default function AddTaskModal({ isOpen, closeModal }) {
  const { handleFormSubmit } = useContext(TasksContext);

  const { register, reset, handleSubmit } = useForm();

  const handleFormSubmitWrapper = (data) => {
    handleFormSubmit(data);
    reset();
    closeModal();
    toast.success("Task added successfully");
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-fit max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <h1 className="text-center text-lg lg:text-xl font-bold font-Roboto">
                    ADD NEW TASK
                  </h1>
                  <form
                    className="space-y-6 font-Roboto"
                    method="POST"
                    onSubmit={handleSubmit((data) =>
                      handleFormSubmitWrapper(data)
                    )}
                  >
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Task title
                      </label>
                      <div className="mt-1">
                        <input
                          id="title"
                          type="text"
                          {...register("title")}
                          required
                          className="block w-full rounded-md border border-gray-400 py-1.5 pl-[5px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Task Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="descriptiond"
                          {...register("description")}
                          rows={3}
                          className="block w-full rounded-md border border-gray-400 py-1.5 pl-[5px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Due Date
                      </label>
                      <div className="mt-1">
                        <input
                          id="date"
                          type="date"
                          {...register("date")}
                          required
                          className="block w-full rounded-md border border-gray-400 py-1.5 pl-[5px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 items-center justify-end">
                      <button
                        onClick={closeModal}
                        className="flex w-[30%] justify-center rounded-md bg-white px-2 lg:px-3 py-1 lg:py-1.5 lg:text-sm text-[13px] font-semibold  text-black shadow-sm cursor-pointer border border-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex w-[30%] justify-center rounded-md bg-indigo-600 px-2 lg:px-3 py-1 lg:py-1.5 lg:text-sm text-[13px] font-semibold  text-white shadow-sm cursor-pointer border border-gray-500"
                      >
                        Add Task
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

AddTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
