import type { ReportData, WasteTypes } from './types';

export const TM_URL = "https://teachablemachine.withgoogle.com/models/wjYFKIbll/";

export const WASTE_TYPES: WasteTypes = {
  taiche: {
    label: "Rác Tái chế",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-500",
  },
  huuco: {
    label: "Rác Hữu cơ",
    color: "text-green-600",
    bgColor: "bg-green-100",
    borderColor: "border-green-500",
  },
  voco: {
    label: "Rác Vô cơ",
    color: "text-red-600",
    bgColor: "bg-red-100",
    borderColor: "border-red-500",
  },
  honhop: {
    label: "Rác Hỗn hợp",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-500",
  },
};

export const ALL_CLASSES_LABELS: { [key: string]: string } = {
  taiche: "Rác Tái chế",
  huuco: "Rác Hữu cơ",
  voco: "Rác Vô cơ",
  honhop: "Rác Hỗn hợp",
  nothing: "Không có gì",
};

export const REPORT_DATA: ReportData = {
  taiche: {
    thuGom: `
      <p>Rác tái chế là các loại rác có thể được sử dụng lại. Trước khi bỏ vào thùng rác, bạn cần:</p>
      <ul class="list-disc list-inside mt-2 space-y-1">
        <li>Làm sạch, loại bỏ thức ăn thừa khỏi <span class="font-semibold text-blue-700">hộp, chai, lọ</span>.</li>
        <li>Phân loại riêng <strong class="text-blue-800">giấy, nhựa, kim loại và thủy tinh</strong> nếu có thể.</li>
        <li>Làm xẹp các hộp giấy, chai nhựa để tiết kiệm diện tích.</li>
      </ul>
    `,
    tacHai: `
      <p>Nếu không được tái chế, loại rác này gây ra nhiều tác hại:</p>
      <ul class="list-disc list-inside mt-2 space-y-1">
        <li>Tốn tài nguyên thiên nhiên (cây, dầu mỏ, quặng) để sản xuất sản phẩm mới.</li>
        <li><strong class="text-red-700">Ô nhiễm đất và nước</strong> do rác nhựa, kim loại khó phân hủy.</li>
        <li>Tăng lượng rác thải tại các bãi chôn lấp, gây quá tải.</li>
      </ul>
    `,
    taiSuDung: `
      <p>Rác tái chế được xử lý và trở thành nguyên liệu cho các sản phẩm mới:</p>
      <ul class="list-disc list-inside mt-2 space-y-1">
        <li><span class="font-semibold text-green-700">Giấy</span> được tái chế thành giấy viết, giấy vệ sinh, thùng carton.</li>
        <li><span class="font-semibold text-green-700">Nhựa</span> có thể tái chế thành chai lọ mới, sợi dệt, bàn ghế.</li>
        <li><span class="font-semibold text-green-700">Kim loại (lon nhôm, sắt)</span> được nấu chảy để sản xuất các vật dụng kim loại khác.</li>
      </ul>
    `,
    huongDan: `
      <p><strong>Lưu ý:</strong> Không phải tất cả các loại nhựa đều có thể tái chế. Hãy tìm <span class="font-mono font-bold text-blue-700">biểu tượng tái chế (♻)</span> trên sản phẩm để chắc chắn nhé!</p>
    `
  },
  huuco: {
    thuGom: `
      <p>Rác hữu cơ là rác có nguồn gốc từ sinh vật, dễ phân hủy. Cách thu gom:</p>
      <ul class="list-disc list-inside mt-2 space-y-1">
        <li>Để riêng <strong class="text-green-800">thức ăn thừa, rau củ quả hỏng, lá cây</strong> vào một thùng riêng.</li>
        <li>Sử dụng túi đựng rác tự phân hủy sinh học để thân thiện hơn với môi trường.</li>
        <li>Không bỏ lẫn rác nhựa, kim loại, thủy tinh vào thùng rác hữu cơ.</li>
      </ul>
    `,
    tacHai: `
      <p>Khi bị lẫn với các loại rác khác, rác hữu cơ gây ra:</p>
      <ul class="list-disc list-inside mt-2 space-y-1">
        <li>Gây mùi <strong class="text-red-700">hôi thối</strong> khó chịu khi phân hủy tại các bãi rác.</li>
        <li>Tạo ra nước rỉ rác, ngấm xuống đất và gây <span class="font-semibold text-red-700">ô nhiễm nguồn nước ngầm</span>.</li>
        <li>Sinh ra khí metan (CH4), một loại khí nhà kính mạnh, góp phần vào biến đổi khí hậu.</li>
      </ul>
    `,
    taiSuDung: `
      <p>Rác hữu cơ là một nguồn tài nguyên quý giá nếu được xử lý đúng cách:</p>
      <ul class="list-disc list-inside mt-2 space-y-1">
        <li>Ủ thành <strong class="text-green-800">phân compost</strong> giàu dinh dưỡng để bón cho cây trồng, cải tạo đất.</li>
        <li>Sử dụng trong các hầm biogas để tạo ra <span class="font-semibold text-green-700">khí đốt sinh học</span>, phục vụ đun nấu.</li>
        <li>Làm thức ăn cho một số loại vật nuôi như giun đất.</li>
      </ul>
    `,
    huongDan: `
      <p><strong>Mẹo hay:</strong> Bạn có thể tự làm <span class="font-semibold text-green-700">phân compost</span> tại nhà từ rác hữu cơ. Đây là cách tuyệt vời để có phân bón sạch cho cây trồng trong vườn.</p>
    `
  },
  voco: {
    thuGom: `
      <p>Rác vô cơ là những loại rác không thể tái chế và không phân hủy sinh học. Cần xử lý cẩn thận:</p>
      <ul class="list-disc list-inside mt-2 space-y-1">
        <li>Để riêng các vật dụng như <strong class="text-gray-800">sành, sứ, gạch, gương vỡ, pin, bóng đèn</strong>.</li>
        <li>Đối với các vật sắc nhọn, cần bọc kỹ bằng giấy báo để đảm bảo an toàn cho người thu gom.</li>
        <li><span class="font-semibold text-red-700">Pin, ắc quy, bóng đèn huỳnh quang</span> là rác nguy hại, cần được thu gom tại các điểm đặc biệt.</li>
      </ul>
    `,
    tacHai: `
      <p>Đây là loại rác có tác động tiêu cực lâu dài đến môi trường:</p>
      <ul class="list-disc list-inside mt-2 space-y-1">
        <li>Tồn tại hàng trăm, hàng nghìn năm trong môi trường mà không bị phân hủy.</li>
        <li><strong class="text-red-700">Pin và thiết bị điện tử</strong> chứa các kim loại nặng như chì, thủy ngân, cadimi, có thể rò rỉ và gây <span class="font-semibold text-red-700">ngộ độc cho đất và nước</span>.</li>
        <li>Làm cạn kiệt không gian tại các bãi chôn lấp.</li>
      </ul>
    `,
    taiSuDung: `
      <p>Hầu hết rác vô cơ không thể tái sử dụng trực tiếp, mà chủ yếu được xử lý bằng cách:</p>
      <ul class="list-disc list-inside mt-2 space-y-1">
        <li>Chôn lấp hợp vệ sinh tại các bãi rác được quy hoạch.</li>
        <li>Một số loại như <strong class="text-green-800">vật liệu xây dựng vỡ</strong> có thể được tận dụng để san lấp mặt bằng.</li>
        <li>Nghiên cứu các công nghệ mới để tái chế hoặc xử lý an toàn hơn.</li>
      </ul>
    `,
    huongDan: `
      <p><strong>Cảnh báo an toàn:</strong> Luôn đeo găng tay khi xử lý các vật sắc nhọn như mảnh gương, sành vỡ. Đối với pin hỏng, hãy tìm các <span class="font-semibold text-red-700">điểm thu hồi pin</span> đặc biệt, không vứt vào thùng rác chung.</p>
    `
  },
  honhop: {
    thuGom: `
      <p>Rác hỗn hợp là loại rác thải sinh hoạt thông thường còn lại sau khi đã phân loại rác tái chế và hữu cơ.</p>
      <ul class="list-disc list-inside mt-2 space-y-1">
        <li>Bao gồm <strong class="text-yellow-800">túi nilon, hộp xốp, giấy ăn đã qua sử dụng, vỏ bim bim</strong>,...</li>
        <li>Bỏ vào thùng rác sinh hoạt chung và đảm bảo được thu gom đúng lịch.</li>
        <li>Hạn chế tối đa loại rác này bằng cách giảm sử dụng đồ nhựa một lần.</li>
      </ul>
    `,
    tacHai: `
      <p>Đây là gánh nặng lớn nhất cho môi trường và hệ thống xử lý rác thải:</p>
      <ul class="list-disc list-inside mt-2 space-y-1">
        <li>Gây <strong class="text-red-700">quá tải</strong> cho các bãi chôn lấp và lò đốt rác.</li>
        <li>Khó xử lý vì chứa nhiều thành phần khác nhau, gây ô nhiễm không khí khi đốt và ô nhiễm đất/nước khi chôn lấp.</li>
        <li><span class="font-semibold text-red-700">Túi nilon và hộp xốp</span> mất hàng trăm năm để phân hủy, gây ra ô nhiễm trắng.</li>
      </ul>
    `,
    taiSuDung: `
      <p>Việc tái sử dụng rác hỗn hợp rất hạn chế, chủ yếu là xử lý để giảm tác động:</p>
      <ul class="list-disc list-inside mt-2 space-y-1">
        <li>Đốt trong các lò đốt công nghệ cao để <strong class="text-green-800">phát điện</strong>, giảm thể tích rác.</li>
        <li>Chôn lấp hợp vệ sinh.</li>
        <li>Giải pháp tốt nhất là <span class="font-semibold text-green-700">hạn chế phát sinh</span> loại rác này ngay từ đầu.</li>
      </ul>
    `,
    huongDan: `
      <p><strong>Hãy hành động:</strong> Giảm thiểu rác hỗn hợp bằng cách mang theo <span class="font-semibold text-yellow-700">túi vải</span> khi đi mua sắm và sử dụng <span class="font-semibold text-yellow-700">bình nước cá nhân</span> thay vì chai nhựa một lần.</p>
    `
  },
};