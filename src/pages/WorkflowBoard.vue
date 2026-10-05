<template>
  <div class="space-y-6 w-full min-w-0">
    <!-- Header & Pipeline Metrics -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Production Pipeline & Workflow
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Real-time 7-stage prosthetic manufacturing pipeline with zero-scroll responsive stages
        </p>
      </div>

      <div class="flex items-center gap-2 self-start sm:self-auto">
        <!-- View Mode Switcher -->
        <div class="inline-flex rounded-2xl bg-white dark:bg-[#090e18] p-1 border border-slate-200/90 dark:border-slate-800 shadow-sm text-xs">
          <button
            type="button"
            @click="viewMode = 'stage-focus'"
            :class="[
              'px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5',
              viewMode === 'stage-focus'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            ]"
          >
            <i class="pi pi-compass text-[11px]" />
            <span>Stage Focus</span>
          </button>
          <button
            type="button"
            @click="viewMode = 'vertical-flow'"
            :class="[
              'px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5',
              viewMode === 'vertical-flow'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            ]"
          >
            <i class="pi pi-bars text-[11px]" />
            <span>Vertical Bays</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 7-Stage Interactive Navigation Stepper (Zero Horizontal Scroll - Grid/Flex Wrap) -->
    <div class="p-3 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm">
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        <button
          v-for="(stage, idx) in stages"
          :key="stage.id"
          type="button"
          @click="activeStageId = stage.id; sound.playClick()"
          :class="[
            'p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between',
            activeStageId === stage.id
              ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 ring-1 ring-indigo-500 shadow-xs'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-[#0c1220]/50'
          ]"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-mono font-bold text-slate-400">Step {{ idx + 1 }}</span>
            <span
              :class="[
                'text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full',
                activeStageId === stage.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              ]"
            >
              {{ getOrdersInStage(stage.id).length }}
            </span>
          </div>

          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full shrink-0" :class="stage.dotColor" />
            <span class="text-xs font-bold text-slate-900 dark:text-white truncate">
              {{ stage.shortTitle }}
            </span>
          </div>
        </button>
      </div>
    </div>

    <!-- Filter & Search Toolbar -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm">
      <div class="flex items-center gap-2 w-full sm:w-auto">
        <IconField class="w-full sm:w-72">
          <InputIcon class="pi pi-search text-xs text-slate-400" />
          <InputText
            v-model="searchQuery"
            placeholder="Search orders, patient, doctor..."
            class="w-full text-xs !rounded-2xl !bg-slate-50 dark:!bg-[#0c1220]"
          />
        </IconField>

        <Select
          v-model="priorityFilter"
          :options="['All Priorities', 'Urgent', 'High', 'Normal', 'Low']"
          class="!rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
        />
      </div>

      <div class="text-xs text-slate-400 flex items-center gap-2 self-end sm:self-auto">
        <span>Showing <strong>{{ filteredOrders.length }}</strong> active orders</span>
      </div>
    </div>

    <!-- VIEW MODE 1: Active Stage Focus (Clean Responsive Multi-Column Grid) -->
    <div v-if="viewMode === 'stage-focus'" class="space-y-4">
      <!-- Active Stage Banner Card -->
      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold" :class="currentStage?.dotColor">
            <i :class="currentStage?.icon" class="text-base" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base font-extrabold text-slate-900 dark:text-white">
                {{ currentStage?.title }}
              </h2>
              <Tag
                :value="`${filteredOrders.length} Orders In Queue`"
                severity="success"
                class="!text-[10px] !font-bold"
              />
            </div>
            <p class="text-xs text-slate-400 mt-0.5">{{ currentStage?.desc }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="advanceAllInStage"
            :disabled="filteredOrders.length === 0"
            class="px-3.5 py-2 rounded-2xl text-xs font-bold text-white bg-black dark:bg-white dark:text-black hover:opacity-90 active:scale-95 transition-all cursor-pointer disabled:opacity-40 flex items-center gap-1.5"
          >
            <i class="pi pi-fast-forward text-xs" />
            <span>Advance All Orders ({{ filteredOrders.length }})</span>
          </button>
        </div>
      </div>

      <!-- Orders Grid (Responsive: 1 col on mobile, 2 on tablet, 3 on desktop, 4 on wide) -->
      <div v-if="filteredOrders.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="group p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <div>
                <span class="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                  {{ order.orderNumber }}
                </span>
                <h4 class="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                  {{ order.patientName }}
                </h4>
              </div>

              <Tag
                v-if="order.priority === 'Urgent' || order.priority === 'High'"
                :value="order.priority"
                severity="danger"
                class="!text-[9px] !font-bold"
              />
            </div>

            <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-xs space-y-1 mb-3">
              <div class="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Restoration:</span>
                <strong class="text-slate-800 dark:text-slate-200">{{ order.restoration }}</strong>
              </div>
              <div class="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Shade / Units:</span>
                <strong class="text-slate-800 dark:text-slate-200">{{ order.shade }} • {{ order.units || 1 }} unit(s)</strong>
              </div>
              <div class="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Doctor:</span>
                <span class="truncate max-w-[130px] font-medium">{{ order.doctorName }}</span>
              </div>
              <div class="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Due Date:</span>
                <span class="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">{{ formatDate(order.dueDate) }}</span>
              </div>
            </div>
          </div>

          <!-- Bottom Action Buttons: Advance Stage + Details -->
          <div class="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <router-link
              :to="`/orders/${order.id}`"
              class="p-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              title="View full order specs"
            >
              <i class="pi pi-eye text-xs" />
            </router-link>

            <button
              type="button"
              @click="advanceOrderStage(order)"
              class="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold text-white bg-black dark:bg-white dark:text-black hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{{ getNextStageName(order.status) }}</span>
              <i class="pi pi-arrow-right text-[10px]" />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="p-12 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 text-center space-y-2">
        <i class="pi pi-inbox text-3xl text-slate-300 dark:text-slate-700" />
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">No Orders in {{ currentStage?.title }}</h4>
        <p class="text-xs text-slate-400">All cases in this stage have been verified and advanced</p>
      </div>
    </div>

    <!-- VIEW MODE 2: Vertical Stacked Production Bays (Accordion Style - ZERO Horizontal Scroll) -->
    <div v-else class="space-y-4">
      <div
        v-for="stage in stages"
        :key="stage.id"
        class="rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden"
        @dragover.prevent
        @drop="onDrop(stage.id)"
      >
        <!-- Bay Header -->
        <div
          class="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
          @click="toggleBay(stage.id)"
        >
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full" :class="stage.dotColor" />
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">
                  {{ stage.title }}
                </h3>
                <Tag
                  :value="`${getOrdersInStage(stage.id).length} units`"
                  severity="secondary"
                  class="!text-[10px] !font-bold"
                />
              </div>
              <p class="text-xs text-slate-400">{{ stage.desc }}</p>
            </div>
          </div>

          <i
            :class="[
              'pi text-xs text-slate-400 transition-transform duration-200',
              expandedBays.includes(stage.id) ? 'pi-chevron-up' : 'pi-chevron-down'
            ]"
          />
        </div>

        <!-- Bay Content -->
        <div
          v-if="expandedBays.includes(stage.id)"
          class="p-4 sm:p-5 pt-0 border-t border-slate-100 dark:border-slate-800/60"
        >
          <div
            v-if="getOrdersInStage(stage.id).length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pt-3"
          >
            <div
              v-for="order in getOrdersInStage(stage.id)"
              :key="order.id"
              draggable="true"
              @dragstart="onDragStart(order)"
              class="p-4 rounded-2xl bg-slate-50 dark:bg-[#0c1220] border border-slate-200/60 dark:border-slate-800/60 shadow-2xs hover:shadow-md transition-all cursor-grab active:cursor-grabbing hover:border-indigo-500/50 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                    {{ order.orderNumber }}
                  </span>
                  <Tag
                    v-if="order.priority === 'Urgent' || order.priority === 'High'"
                    :value="order.priority"
                    severity="danger"
                    class="!text-[9px]"
                  />
                </div>
                <h4 class="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {{ order.patientName }}
                </h4>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {{ order.restoration }} • {{ order.shade }}
                </p>
              </div>

              <div class="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                <span class="text-[10px] text-slate-400 truncate max-w-[120px]">{{ order.doctorName }}</span>
                <button
                  type="button"
                  @click="advanceOrderStage(order)"
                  class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Advance</span>
                  <i class="pi pi-arrow-right text-[8px]" />
                </button>
              </div>
            </div>
          </div>

          <div v-else class="p-6 text-center text-slate-400 text-xs italic">
            No active units in this manufacturing bay. Drag orders here to assign.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Tag from 'primevue/tag';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { useToast } from 'primevue/usetoast';
import { useDentalStore } from '@/stores/dental';
import { formatDate } from '@/utils/format';
import { sound } from '@/utils/sound';
import type { OrderStatus } from '@/types';

const toast = useToast();
const store = useDentalStore();

const viewMode = ref<'stage-focus' | 'vertical-flow'>('stage-focus');
const activeStageId = ref('New');
const searchQuery = ref('');
const priorityFilter = ref('All Priorities');
const draggedOrder = ref<any>(null);

const stages = [
  { id: 'New', title: '1. Intake & Prescriptions', shortTitle: 'Intake', icon: 'pi pi-inbox', dotColor: 'bg-slate-400', desc: 'Case intake from digital clinics, optical scan import, and DICOM checks' },
  { id: 'Review', title: '2. Clinical Review', shortTitle: 'Review', icon: 'pi pi-check-circle', dotColor: 'bg-amber-500', desc: 'Doctor prescription sign-off, margin inspection, and technical clearance' },
  { id: 'Design', title: '3. 3D CAD Modeling', shortTitle: '3D CAD', icon: 'pi pi-box', dotColor: 'bg-cyan-500', desc: 'Anatomical crowns, bridge nesting, implant custom abutments & emergence' },
  { id: 'Production', title: '4. CAM Milling & Printing', shortTitle: 'Milling', icon: 'pi pi-cog', dotColor: 'bg-blue-600', desc: '5-axis dry & wet milling in multi-layer zirconia, PMMA, and titanium discs' },
  { id: 'Sintering', title: '5. Sintering & Glaze', shortTitle: 'Sintering', icon: 'pi pi-sun', dotColor: 'bg-purple-500', desc: '1500°C furnace sintering, hand staining, and high-gloss glaze firing' },
  { id: 'Quality Check', title: '6. Quality Verification', shortTitle: 'Quality', icon: 'pi pi-shield', dotColor: 'bg-indigo-400', desc: 'Die fit verification under 20x microscope, contact tension & occlusion' },
  { id: 'Ready', title: '7. Ready for Dispatch', shortTitle: 'Dispatch', icon: 'pi pi-send', dotColor: 'bg-indigo-600', desc: 'Sterile packaging, invoice sealing, and courier dispatch to clinic' },
];

const expandedBays = ref<string[]>(['New', 'Review', 'Design', 'Production', 'Ready']);

const currentStage = computed(() => stages.find(s => s.id === activeStageId.value) || stages[0]);

const orders = computed(() => store.orders);

const getOrdersInStage = (stageId: string) => {
  return orders.value.filter(o => {
    if (stageId === 'Ready') return o.status === 'Ready' || o.status === 'Completed';
    return o.status === stageId;
  });
};

const filteredOrders = computed(() => {
  const stageOrders = getOrdersInStage(activeStageId.value);
  const q = searchQuery.value.toLowerCase().trim();
  const p = priorityFilter.value;

  return stageOrders.filter(o => {
    const matchesSearch = !q ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.patientName.toLowerCase().includes(q) ||
      o.doctorName.toLowerCase().includes(q) ||
      o.restoration.toLowerCase().includes(q);

    const matchesPriority = p === 'All Priorities' || o.priority === p;
    return matchesSearch && matchesPriority;
  });
});

const toggleBay = (stageId: string) => {
  const idx = expandedBays.value.indexOf(stageId);
  if (idx > -1) {
    expandedBays.value.splice(idx, 1);
  } else {
    expandedBays.value.push(stageId);
  }
};

const getNextStageId = (currentStatus: OrderStatus): OrderStatus => {
  const orderList: OrderStatus[] = ['New', 'Review', 'Design', 'Production', 'Quality Check', 'Ready'];
  const currentIndex = orderList.indexOf(currentStatus);
  if (currentIndex > -1 && currentIndex < orderList.length - 1) {
    return orderList[currentIndex + 1];
  }
  return 'Ready';
};

const getNextStageName = (currentStatus: OrderStatus): string => {
  const next = getNextStageId(currentStatus);
  const match = stages.find(s => s.id === next);
  return match ? `Advance to ${match.shortTitle}` : 'Mark Complete';
};

const advanceOrderStage = (order: any) => {
  const nextStage = getNextStageId(order.status);
  store.updateOrderStatus(order.id, nextStage);
  sound.playSuccess();
  toast.add({
    severity: 'success',
    summary: 'Stage Advanced',
    detail: `Order ${order.orderNumber} moved to ${nextStage}`,
    life: 2500
  });
};

const advanceAllInStage = () => {
  const nextStage = getNextStageId(activeStageId.value as OrderStatus);
  filteredOrders.value.forEach(order => {
    store.updateOrderStatus(order.id, nextStage);
  });
  sound.playSuccess();
  toast.add({
    severity: 'success',
    summary: 'Batch Advance Complete',
    detail: `Advanced ${filteredOrders.value.length} orders to ${nextStage}`,
    life: 3000
  });
};

const onDragStart = (order: any) => {
  draggedOrder.value = order;
  sound.playClick();
};

const onDrop = (targetStageId: string) => {
  if (draggedOrder.value) {
    store.updateOrderStatus(draggedOrder.value.id, targetStageId as OrderStatus);
    sound.playSuccess();
    toast.add({
      severity: 'info',
      summary: 'Order Moved',
      detail: `Assigned ${draggedOrder.value.orderNumber} to ${targetStageId}`,
      life: 2000
    });
    draggedOrder.value = null;
  }
};
</script>
