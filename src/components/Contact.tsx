import { MapPin, Phone, Clock, Mail } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-[#F9F6F3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[#2E1C10] mb-4">매장 안내 & 창업 문의</h2>
          <p className="text-gray-700">
            현풍닭칼국수와 함께 성공적인 창업을 시작하세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-[#2E1C10] mb-6">본사 정보</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D61C1C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#D61C1C]" />
                </div>
                <div>
                  <p className="text-[#2E1C10] mb-1">주소</p>
                  <p className="text-gray-700">대구광역시 달성군 현풍면</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F37021]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#F37021]" />
                </div>
                <div>
                  <p className="text-[#2E1C10] mb-1">대표 전화</p>
                  <p className="text-gray-700">1566-5046</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C7A45A]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#C7A45A]" />
                </div>
                <div>
                  <p className="text-[#2E1C10] mb-1">운영 시간</p>
                  <p className="text-gray-700">평일 09:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D61C1C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#D61C1C]" />
                </div>
                <div>
                  <p className="text-[#2E1C10] mb-1">운영 법인</p>
                  <p className="text-gray-700">㈜지앤씨신칼</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-[#2E1C10] mb-6">창업 상담 문의</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-[#2E1C10] mb-2">성함</label>
                <input 
                  type="text" 
                  placeholder="이름을 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D61C1C]"
                />
              </div>

              <div>
                <label className="block text-[#2E1C10] mb-2">연락처</label>
                <input 
                  type="tel" 
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D61C1C]"
                />
              </div>

              <div>
                <label className="block text-[#2E1C10] mb-2">관심 지역</label>
                <input 
                  type="text" 
                  placeholder="예) 서울시 강남구"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D61C1C]"
                />
              </div>

              <div>
                <label className="block text-[#2E1C10] mb-2">문의 내용</label>
                <textarea 
                  rows={4}
                  placeholder="창업 문의 내용을 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D61C1C] resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#D61C1C] text-white rounded-lg hover:bg-[#b71616] transition-colors"
              >
                상담 신청하기
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
          <h3 className="text-[#2E1C10] mb-6 text-center">브랜드 컬러 시스템</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-full h-24 bg-[#D61C1C] rounded-lg mb-3 shadow-md"></div>
              <p className="text-[#2E1C10] text-sm">현풍레드</p>
              <p className="text-gray-500 text-xs">#D61C1C</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-[#F37021] rounded-lg mb-3 shadow-md"></div>
              <p className="text-[#2E1C10] text-sm">신칼오렌지</p>
              <p className="text-gray-500 text-xs">#F37021</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-[#2E1C10] rounded-lg mb-3 shadow-md"></div>
              <p className="text-[#2E1C10] text-sm">흑갈필기</p>
              <p className="text-gray-500 text-xs">#2E1C10</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-[#F9F6F3] rounded-lg mb-3 shadow-md border border-gray-200"></div>
              <p className="text-[#2E1C10] text-sm">미색배경</p>
              <p className="text-gray-500 text-xs">#F9F6F3</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-[#C7A45A] rounded-lg mb-3 shadow-md"></div>
              <p className="text-[#2E1C10] text-sm">황동식기색</p>
              <p className="text-gray-500 text-xs">#C7A45A</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
